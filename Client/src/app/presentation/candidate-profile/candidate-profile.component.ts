import { Component, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserService, Error } from 'src/app/common/services/user.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil, filter } from 'rxjs/operators';
import { CV } from 'src/app/common/models/cv-model';
import { CvService } from '../../common/services/cv.service';
import { Candidate, UserType } from 'src/app/common/models/user-model';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CvModalComponent } from './components/cv-modal/cv-modal.component';
import { CvDeleteConfirmComponent } from './components/cv-delete-confirm/cv-delete-confirm.component';

const DEFAULT_CV: any = {};
@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent extends AbstractForm implements OnInit {
  user: Candidate = {} as any;
  listCV: CV[] = [];

  selectedCV: CV = DEFAULT_CV;
  newOrEditCV: CV = {} as any;
  @ViewChild("modal", { static: true }) modal: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private cvService: CvService,
    private routerService: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.newOrEditCV = this.createNewCV();
    this.userService
      .getActiveUser()
      .pipe(
        filter((user) => user.type === UserType.Candidate)
      )
      .subscribe((user: Candidate) => {
        this.user = user;
        this.getListCV(user.userEmail);
      });
  }

  getListCV(userEmail) {
    this.cvService
      .getListCV(userEmail)
      .subscribe((listCV) => {
        this.listCV = listCV;
        this.selectFirstCVViewModel(listCV);
      });
  }

  createNewCV() {
    return {
      title: "New CV Title",
    } as any;
  }

  onShowAddEditCVModal(cv: CV) {
    const modalRef = this.modalService.open(CvModalComponent);
    modalRef.componentInstance.cv = {
      ...cv
    };
    modalRef.close = (cv) => {
      this.upsertCV(cv)
        .then((addedOrUpdatedCV) => {
          if (!cv.id) {
            this.addToCVListViewModel(addedOrUpdatedCV);
          } else {
            this.updateCV(addedOrUpdatedCV);
          }
          modalRef.dismiss();
        },
        (err) => {
          console.error(err);
        });

    }
  }

  onShowDeleteCVModal(cv: CV) {
    const modalRef = this.modalService.open(CvDeleteConfirmComponent);
    modalRef.componentInstance.cvTitle = cv.title
    modalRef.close = () => {
      this.removeCV(cv)
        .then((cv) => {
          this.removeFromCVListViewModel(cv);
          this.selectFirstCVViewModel(this.listCV);
          modalRef.dismiss();
        }, (err) => {
          console.error(err);
        });
    }
  }

  upsertCV(cv: CV): Promise<CV> {
    return new Promise((resolve, reject) => {
      this.cvService.upsertCV({
        id: cv.id,
        title: cv.title,
        profile: cv.profile,
        workExp: cv.workExp,
        education: cv.education,
        languages: cv.languages,
        userEmail: this.user.userEmail
      }).subscribe((cv) => {
        resolve(cv);
      }, (error) => {
        reject(error);
      });
    });
  }

  removeCV(cv: CV) {
    return new Promise((resolve, reject) => {
      this.cvService.removeCV(cv.id).subscribe((cv) => {
        resolve(cv);
      }, (error) => {
        reject(error);
      });
    });
  }

  setSelectedCVViewModel(cv) {
    this.selectedCV = cv;
  }

  selectFirstCVViewModel(listCV) {
    const firstCV = listCV[0] || DEFAULT_CV;
    this.setSelectedCVViewModel(firstCV);
  }

  addToCVListViewModel(cv) {
    this.listCV.push(cv);
  }

  removeFromCVListViewModel(cv) {
    const index = this.listCV.findIndex((item) => item.id === cv.id);
    this.listCV.splice(index, 1);
  }

  updateCV(cv: CV) {
    const foundCV = this.listCV.find((item) => item.id === cv.id);
    Object.assign(foundCV, cv);
  }
}
