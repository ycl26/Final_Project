import {Component, OnInit, Output, Input} from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import {SearchCVServiceService} from './services/search-cvservice.service';
import {UserService, Error} from 'src/app/common/services/user.service';
import {AbstractForm} from 'src/infra/form/abstract-form';
import {takeUntil} from 'rxjs/operators';
import {CV} from 'src/app/common/models/cv-model';
import {CvService} from '../../common/services/cv.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent extends AbstractForm implements OnInit {
  userEmail: string;
  listCV: CV[];
  cvItemToView: CV;
  newCVTitle = 'New CV Title';
  profile: string;
  workExp: string;
  education: string;
  active: string;
  languages: string;
  @Input() cv: CV;

  constructor(private route: ActivatedRoute,
              private searchCVServiceService: SearchCVServiceService,
              private cvService: CvService,
              private routerService: Router,
              private userService: UserService
  ) {
    super();
  }

  ngOnInit() {
    this.getListCV();
    this.getActiveCV();
    this.userService.getActiveUser().subscribe((user) => {
      this.userEmail = user.userEmail;
    });
  }

  getListCV() {
    this.searchCVServiceService.getListCV(this.userEmail).subscribe((listCV) => {
      this.listCV = listCV;
    });
  }

  receivedOnCVItemClick($event) {
    this.cvItemToView = $event;
  }

  getActiveCV() {
    this.cvItemToView = this.listCV.find((item) => item.active === true);
  }

  submitCV() {
    this.cvService.createCV({
      title: this.newCVTitle,
      profile: this.profile,
      workExp: this.workExp,
      education: this.education,
      active: this.active,
      languages: this.languages,
      userEmail: this.userEmail
    }).subscribe((cv) => {
      // todo if everything ok then close the dialog
      console.log(cv);
      // this.listCV = cv.candidate.CVs
    });
  }
}
