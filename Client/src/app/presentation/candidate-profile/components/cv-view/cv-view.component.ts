import {Component, OnInit, Input} from '@angular/core';
import {CV} from 'src/app/common/models/cv-model';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchJobService} from 'src/app/presentation/job-offers/services/search-job.service';


@Component({
  selector: 'app-cv-view',
  templateUrl: './cv-view.component.html',
  styleUrls: ['./cv-view.component.css']
})
export class CvViewComponent implements OnInit {
  @Input() cv: CV;
  @Input() listCV: CV[];
  editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private searchJobService: SearchJobService,
    private routerService: Router
  ) {
  }

  ngOnInit() {
  }

  onEditClick() {
    this.editMode = true;
  }

  onDeleteClick() {
    this.listCV.splice(this.cv.id, 1);
  }

  onSaveClick() {
    this.editMode = false;
  }

  onCancelClick() {
    this.editMode = false;
  }
}
