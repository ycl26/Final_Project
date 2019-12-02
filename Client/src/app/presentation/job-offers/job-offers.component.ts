import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { SearchJobService } from './services/search-job.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';
import {  Job } from 'src/app/common/models/job-model';
import { UserService, Error } from 'src/app/common/services/user.service';
import { User, ActiveUser } from 'src/app/common/models/user-model';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent extends AbstractForm implements OnInit {
  keyword:any; 
  filterKeyWord:any;
  jobItemToView:Job;
  displayEditDeleteButton: boolean; 
  activeUser:ActiveUser;
  @Output() jobs:Job[]; 
  
  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
    private routerService: Router,
    private userService: UserService,
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
      this.jobItemToView=this.jobs[0];
    });

    this.keyword = keyword;  

      this.userService.getActiveUser().pipe(
        takeUntil(this._unsubscribe$),
      ).subscribe((user) => {
        this.activeUser = user;
        console.log("activeUser", this.activeUser)
      });
   
  }
  handleKeydown(event: KeyboardEvent) {     
     if(event.key === "Enter" ){       
      this.newSearch();
    }
  }
  newSearch() {    
    this.searchJobService.getJobs(this.filterKeyWord).subscribe((jobs) => {
      this.jobs = jobs;
      this.jobItemToView=this.jobs[0];     
    });  
    console.log(this.filterKeyWord);
  } 
 

recievedOnJobItemClick($event){
this.jobItemToView=$event;
}
editbDeleteJob(){

}

}
