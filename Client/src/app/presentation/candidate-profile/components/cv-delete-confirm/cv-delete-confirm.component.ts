import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cv-delete-confirm',
  templateUrl: './cv-delete-confirm.component.html',
  styleUrls: ['./cv-delete-confirm.component.css']
})
export class CvDeleteConfirmComponent implements OnInit {
  @Input() cvTitle: string;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
