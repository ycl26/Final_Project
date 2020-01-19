import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import { Job } from 'src/app/common/models/job-model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Input() jobs: Job[];
  @Input() selectedJob: Job;  
  @Input() displayEditDeleteButton: boolean;
  // @Output() jobItemClick = new EventEmitter<any>();
  @Output() selected = new EventEmitter<any>();
  selectedIndex = 0; // TODO: initialice with the active job from db
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedJobChanges = changes['selectedJob'];
    if(selectedJobChanges && this.selectedIndex !== selectedJobChanges.currentValue) {
      const job = selectedJobChanges.currentValue;
      this.selectedIndex = this.jobs.findIndex((item) => item.id === job.id);
    }
  }


  onJobViewDisplay(selectedJobItem) {
    this.selected.emit(selectedJobItem);
  }
  setIndex(index: number) {
    this.selectedIndex = index;
  }
}
