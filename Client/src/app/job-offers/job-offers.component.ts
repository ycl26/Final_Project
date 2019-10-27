import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { SearchJobService } from './services/search-job.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent extends AbstractForm implements OnInit {
  keyword;
  jobs;
  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
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
    });

    this.keyword = keyword;

  }

}
