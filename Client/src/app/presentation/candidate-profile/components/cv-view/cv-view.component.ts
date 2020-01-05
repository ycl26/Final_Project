import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CV} from 'src/app/common/models/cv-model';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchJobService} from 'src/app/presentation/job-offers/services/search-job.service';


@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {
  @Input() cv: CV = {} as any;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  onEditClick() {
    this.edit.emit();
  }

  onDeleteClick() {
   this.delete.emit();
  }
}
