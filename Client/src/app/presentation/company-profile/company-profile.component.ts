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
export class CompanyProfileComponent extends AbstractForm implements OnInit {
  editMode: boolean;
  newJobTitle = 'New Job Title';
  @Input() jobs: Job[];  
  listCVs: CV[];
  listJob: Job[]=[];
  selectedCV: CV = {} as CV;
  cvTitleForSearch: string = ""; 
  user: Company = {} as any;
  selectedJob: Job = DEFAULT_Job; 
  newOrEditJob: Job = {} as any;
  @ViewChild("modal", { static: true }) modal: ElementRef;
  

  constructor(
    private jobService: jobService,
    private route: ActivatedRoute,
    private cvService: CvService,
    private routerService: Router,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit() {
    this.newOrEditJob = this.createNewJob();
    this.userService
      .getActiveUser()
      .pipe(
        filter((user) => user.type === UserType.Company)
      )
      .subscribe((user: Company) => {
        this.user = user;  
        this.getListJob(user.userEmail);           
      });
      this.jobService.getListJob(this.user.userEmail).subscribe((Jobs: Job[])=>{
        this.listJob = Jobs;
      }      
      );
  }
 
  getListJob(userEmail) {
    this.jobService
      .getListJob(userEmail)
      .subscribe((listJob) => {
        this.listJob = listJob;
        this.selectFirstJobViewModel(listJob);
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
            this.selectFirstJobViewModel(this.listJob);
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

  onShowDeleteJobModal(job: Job) {
    const modalRef = this.modalService.open(JobDeleteConfirmComponent);
    modalRef.componentInstance.jobTitle = job.title
    modalRef.close = () => {
      this.removeJob(job)
        .then((job) => {
          this.removeFromJobListViewModel(job);
          this.selectFirstJobViewModel(this.listJob);
          modalRef.dismiss();
        }, (err) => {
          console.error(err);
        });
    }
  }

  upsertJob(job: Job): Promise<Job> {
    return new Promise((resolve, reject) => {
      this.jobService.upsertJob({
        id: job.id,
        title: job.title,
        description: job.description,
        salary: job.salary,
        reqSkills:job.reqSkills,
        type: job.type,
        date: job.date,
        compName: job.compName,
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
  
  setSelectedJobViewModel(job) {
    this.selectedJob = job;
  }

  selectFirstJobViewModel(listJob: Job[]) {
    const firstJob = listJob[0] || DEFAULT_Job;
    this.setSelectedJobViewModel(firstJob);
  }
  addToJobListViewModel(job) {
    this.listJob.push(job);
  }
  removeFromJobListViewModel(job) {
    const index = this.listJob.findIndex((item) => item.id === job.id);
    this.listJob.splice(index, 1);
  }
 
  updateJob(job: Job) {   
      const foundJob = this.listJob.find((item) => item.id === job.id);
      Object.assign(foundJob, job);    
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
}
