import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SearchJobService } from '../../services/search-job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/common/models/job-model';


@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css']
})
export class JobViewComponent implements OnInit {
  @Input() job: Job;
  @Input() displayEditDeleteButton: boolean;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
    private routerService: Router,
  ) {

  }

  ngOnInit() {
  }

  onEditClick() {
    this.edit.emit();
  }

  onDeleteClick() {
   this.delete.emit();
  }
}
