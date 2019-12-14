import { Component, OnInit, Input, Output } from '@angular/core';
import { CV } from 'src/app/common/models/cv-model';

@Component({
  selector: 'app-active-cv-list',
  templateUrl: './active-cv-list.component.html',
  styleUrls: ['./active-cv-list.component.css']
})
export class ActiveCvListComponent implements OnInit {
  @Input() listCV: CV[];
  constructor() { }

  ngOnInit() {
  }

}
