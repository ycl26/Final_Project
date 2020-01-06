import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-job-delete-confirm',
  templateUrl: './job-delete-confirm.component.html',
  styleUrls: ['./job-delete-confirm.component.css']
})
export class JobDeleteConfirmComponent implements OnInit {
  @Input() jobTitle: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
}