import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Ijob } from 'src/app/job-model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Input() jobs:Ijob[];
  @Output() onJobItemClick= new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  onJobViewDisplay(selectedJobItem){
    this.onJobItemClick.emit(selectedJobItem);
  }
}
