import { Component, OnInit, Output } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { SearchCVServiceService } from './services/search-cvservice.service';
import { UserService, Error } from 'src/app/common/services/user.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';
import { cv } from 'src/app/common/models/cv-model';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent extends AbstractForm implements OnInit {
  CandidateId: any;
  listCV: cv[];
  CVItemToView: cv;

  constructor(private route: ActivatedRoute,
    private searchCVServiceService: SearchCVServiceService,
    private routerService: Router,
    private userService:UserService,
  ) {
    super();
  }
  ngOnInit() {
    this.getListCV();
    this.getActiveCV();
  }
  getListCV() {
    this.searchCVServiceService.getListCV(this.CandidateId).subscribe((listCV) => {
      this.listCV = listCV;
    });
    console.log(this.CandidateId);
  }
  recievedOnCVItemClick($event) {
    this.CVItemToView = $event;
  }
  getActiveCV() {
    this.CVItemToView = this.listCV.find(function (item) { return item.active === true; });
  }
  getActiveUser() {
    this.userService.getActiveUser().subscribe((user) => {
      console.log(user);
    });   
  }
}
