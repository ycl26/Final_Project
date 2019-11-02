import { Component, OnInit, Input } from '@angular/core';
import { SearchJobService } from '../../services/search-job.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {
  @Input() job: object;
  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
    private routerService: Router,
  ) {

  }

  ngOnInit() {
  }
}
