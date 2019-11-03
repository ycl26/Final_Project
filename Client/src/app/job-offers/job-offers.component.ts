import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { SearchJobService } from './services/search-job.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';
import { Ijob } from '../job-model';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent extends AbstractForm implements OnInit {
  keyword:any; 
  filterKeyWord:any;
  jobItemToView:Ijob;
  @Output() jobs:Ijob[]; 
 
  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
    private routerService: Router,
  ) {
    super();//why super
  }
  ngOnInit() {
    const keyword = this.route.snapshot.queryParams.keyword;
    const jobs$ = this.searchJobService.getJobs(keyword); //why $ after jobs
    

    jobs$.pipe(
      takeUntil(this._unsubscribe$)
    ).subscribe((jobs) => {
      this.jobs = jobs;
      this.jobItemToView=this.jobs[0];
    });

    this.keyword = keyword;

  }
  handleKeydown(event: KeyboardEvent) {     
     if(event.key === "Enter" ){       
      this.newSearch();
    }
  }
  newSearch() {    
    this.searchJobService.getJobs(this.filterKeyWord).subscribe((jobs) => {
      this.jobs = jobs;
    });  
    console.log(this.filterKeyWord);
  } 
 

recievedOnJobItemClick($event){
this.jobItemToView=$event;
}

}
