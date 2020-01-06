import { Component, OnInit, Output, Input, ViewChild, ElementRef} from '@angular/core';
import { Job } from 'src/app/common/models/job-model';
import { CvService } from 'src/app/common/services/cv.service';
import { jobService } from 'src/app/common/services/job.service';
import { CV } from 'src/app/common/models/cv-model';
import { JobModalComponent } from '../job-offers/job-modal/job-modal.component';
import { JobDeleteConfirmComponent } from '../job-offers/components/job-delete-confirm/job-delete-confirm.component';
import { Company } from 'src/app/common/models/user-model';



import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserService, Error } from 'src/app/common/services/user.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil, filter } from 'rxjs/operators';
import { Candidate, UserType } from 'src/app/common/models/user-model';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const DEFAULT_Job: any = {};
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  editMode: boolean;
  newJobTitle = 'New Job Title';
  @Input() jobs: Job[];
  listCVs: CV[];
  selectedCV: CV = {} as CV;
  cvTitleForSearch: string = ""; 
  user: Company = {} as any;
  selectedJob: CV = DEFAULT_Job;

  constructor(
    private jobService: jobService,
    private route: ActivatedRoute,
    private cvService: CvService,
    private routerService: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }
  onEditClick() {
    this.editMode = true;
  }

  onSaveClick() {
    this.editMode = false;
  }

  onSearchCVByTitle(cvTitle: string) {
    return this.searchCVByTitle(cvTitle)
      .then((CVs) => {
        this.listCVs = CVs;
      })
  }

  setSelectedCVViewModel(cv: CV) {
    this.selectedCV = cv;
  }

  searchCVByTitle(cvTitle: string): Promise<CV[]> {
    return new Promise((resolve, reject) => {
      this.cvService
        .findByTitle(cvTitle)
        .subscribe((CVs) => {
          resolve(CVs);
        }, (error) => {
          reject(error);
        });
    });
  }

  createNewJob() {
    return {
      title: "New Job Offer",
    } as any;
  }
  onShowAddEditJobModal(job: Job) {
    const modalRef = this.modalService.open(JobModalComponent);
    modalRef.componentInstance.job = {
      ...job
    };
    modalRef.close = (job) => {
      this.upsertJob(job)
        .then((addedOrUpdatedJob) => {
          if (!job.id) {
            this.addToJobListViewModel(addedOrUpdatedJob);
          } else {
            this.updateJob(addedOrUpdatedJob);
          }
          modalRef.dismiss();
        },
        (err) => {
          console.error(err);
        });

    }
  }
  
  addToJobListViewModel(job) {
    this.jobs.push(job);
  }
  updateJob(job: Job) {   
      const foundJob = this.jobs.find((item) => item.id === job.id);
      Object.assign(foundJob, job);    
  } 
  setSelectedJobViewModel(job) {
    this.selectedJob = job;
  }

  onShowDeleteJobModal(job: Job) {
    const modalRef = this.modalService.open(JobDeleteConfirmComponent);
    modalRef.componentInstance.jobTitle = job.title
    modalRef.close = () => {
      this.removeJob(job)
        .then((job) => {
          this.removeFromJobListViewModel(job);
          this.selectFirstJobViewModel(this.jobs);
          modalRef.dismiss();
        }, (err) => {
          console.error(err);
        });
    }
  }
  removeFromJobListViewModel(job) {
    const index = this.jobs.findIndex((item) => item.id === job.id);
    this.jobs.splice(index, 1);
  }
  selectFirstJobViewModel(jobs: Job[]) {
    const firstJob = jobs[0] || DEFAULT_Job;
    this.setSelectedJobViewModel(firstJob);
  }

  upsertJob(job: Job): Promise<Job> {
    return new Promise((resolve, reject) => {
      this.jobService.upsertJob({
        id: job.id,
        title: job.title,
        description: job.description,
        type: job.type,
        date: job.date,
        userEmail: this.user.userEmail
      }).subscribe((job) => {
        resolve(job);
      }, (error) => {
        reject(error);
      });
    });
  }

  removeJob(job: Job) {
    return new Promise((resolve, reject) => {
      this.jobService.removeJob(job.id).subscribe((job) => {
        resolve(job);
      }, (error) => {
        reject(error);
      });
    });
  }
}
