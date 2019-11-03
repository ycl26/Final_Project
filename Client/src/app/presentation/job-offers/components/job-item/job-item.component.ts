import { Component, OnInit, Input, Output } from '@angular/core';
import { Job } from 'src/app/common/models/job-model';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Output() @Input() job: Job;

  constructor() { }
  
  ngOnInit() {
  }
  

}
