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
import { of } from 'rxjs';

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
  allJobs: Job[];
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
    // const jobs$ = this.searchJobService.getJobs(keyword);

    // jobs$.pipe(
    //   takeUntil(this._unsubscribe$)
    // ).subscribe((jobs) => {
    //   this.jobs = jobs;
    //   this.jobItemToView = this.jobs[0];
    // });
    this.jobService
    .getAllJobs()
    .subscribe((listJob) => {
      this.jobs = listJob;
      this.allJobs=listJob;
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
   filter = (predicate, array: any) => {
    const result = [];
    for (let index = 0; index < array.length; index++) {
      if (predicate(array[index])) {
        result.push(array[index]);
      }
    }
    return result;
  };

  newSearch() {
    const byName = (job) => job.title.indexOf(this.filterKeyWord) > -1;
  
    let filteredJobs = [];
    if (this.filterKeyWord == undefined) {

      filteredJobs = this.allJobs;
    } else {
      filteredJobs = this.filter(byName, this.allJobs);
    }
    console.log('jobName:', this.filterKeyWord);   
    
      this.jobs = filteredJobs;
      this.jobItemToView = this.jobs[0];
 
   
  }
  receivedOnJobItemClick($event) {
    this.jobItemToView = $event;
  }

  editbDeleteJob() {

  }

  setSelectedJobViewModel(job) {
    this.selectedJob = job;
  }
}
