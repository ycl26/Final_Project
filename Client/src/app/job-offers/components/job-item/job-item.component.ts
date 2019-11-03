import { Component, OnInit, Input, Output } from '@angular/core';
import { Ijob } from '../../../job-model'

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Output() @Input() job: Ijob;

  constructor() { }
  
  ngOnInit() {
  }
  

}
