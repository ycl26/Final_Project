import { Component, OnInit, Input } from '@angular/core';
import { Job } from 'src/app/common/models/job-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit {
  @Input() job: Job; 
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}