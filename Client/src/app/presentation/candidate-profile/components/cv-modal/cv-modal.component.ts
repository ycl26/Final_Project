import { Component, OnInit, Input } from '@angular/core';
import { CV } from 'src/app/common/models/cv-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cv-modal',
  templateUrl: './cv-modal.component.html',
  styleUrls: ['./cv-modal.component.css']
})
export class CvModalComponent {
  @Input() cv: CV;

  constructor(public activeModal: NgbActiveModal) {}

}
