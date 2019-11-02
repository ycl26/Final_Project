import { Component, OnInit, Input,Output } from '@angular/core';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {
  
  @Output() @Input() job: object={ id:1, name: 'expedia', date:'20-02-19', description: 'this is the description of the job'};
 
  constructor() { }

  ngOnInit() {
  }

}
