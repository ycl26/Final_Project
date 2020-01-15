import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Route, ActivatedRoute, Router} from '@angular/router';
import {SearchJobService} from './services/search-job.service';
import {AbstractForm} from 'src/infra/form/abstract-form';
import {takeUntil} from 'rxjs/operators';
import {Job} from 'src/app/common/models/job-model';
import {UserService, Error} from 'src/app/common/services/user.service';
import {User, ActiveUser, Company} from 'src/app/common/models/user-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobModalComponent } from './job-modal/job-modal.component';
import { JobDeleteConfirmComponent } from '../job-offers/components/job-delete-confirm/job-delete-confirm.component';
import { CV } from 'src/app/common/models/cv-model';
import { jobService } from 'src/app/common/services/job.service';

const DEFAULT_Job: any = {};
@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent extends AbstractForm implements OnInit {
  keyword: any;
  filterKeyWord: any;
  jobItemToView: Job;
  displayEditDeleteButton: boolean;
  activeUser: ActiveUser;
  selectedJob: CV = DEFAULT_Job;
  user: Company = {} as any;
  @Output() jobs: Job[];

  constructor(
    private route: ActivatedRoute,
    private jobService: jobService,
    private searchJobService: SearchJobService,
    private routerService: Router,
    private userService: UserService,
    private modalService: NgbModal,
  ) {
    super();
  }

  ngOnInit() {
    const keyword = this.route.snapshot.queryParams.keyword;
    const jobs$ = this.searchJobService.getJobs(keyword);

    jobs$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((jobs) => {
      this.jobs = jobs;
      this.jobItemToView = this.jobs[0];
    });

    this.keyword = keyword;

    this.userService.getActiveUser().pipe(
      takeUntil(this._unsubscribe$),
    ).subscribe((user) => {
      this.activeUser = user;
      console.log('activeUser', this.activeUser);
    });
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.newSearch();
    }
  }

  newSearch() {
    this.searchJobService.getJobs(this.filterKeyWord).subscribe((jobs) => {
      this.jobs = jobs;
      this.jobItemToView = this.jobs[0];
    });
    console.log(this.filterKeyWord);
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
  receivedOnJobItemClick($event) {
    this.jobItemToView = $event;
  }

  editbDeleteJob() {

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
