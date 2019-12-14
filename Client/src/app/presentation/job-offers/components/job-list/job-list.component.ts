import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Job } from 'src/app/common/models/job-model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Input() jobs: Job[];
  @Input() displayEditDeleteButton: boolean;
  @Output() jobItemClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onJobViewDisplay(selectedJobItem) {
    this.jobItemClick.emit(selectedJobItem);
  }
}
