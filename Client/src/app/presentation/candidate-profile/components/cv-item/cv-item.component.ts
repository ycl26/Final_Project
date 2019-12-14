import { Component, OnInit, Input, Output } from '@angular/core';
import { CV } from 'src/app/common/models/cv-model';

@Component({
  selector: 'app-cv-item',
  templateUrl: './cv-item.component.html',
  styleUrls: ['./cv-item.component.css']
})
export class CvItemComponent implements OnInit {
  @Output() @Input() cv: CV;
  constructor() { }

  ngOnInit() {
  }


}
