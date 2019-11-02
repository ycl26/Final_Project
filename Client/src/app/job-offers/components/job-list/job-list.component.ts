import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @Input() jobs: object;
  constructor() { }

  ngOnInit() {
  }

}
