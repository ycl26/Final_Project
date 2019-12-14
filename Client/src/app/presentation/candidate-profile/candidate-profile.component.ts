import { Component, OnInit, Output, Input } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { SearchCVServiceService } from './services/search-cvservice.service';
import { UserService, Error } from 'src/app/common/services/user.service';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';
import { CV } from 'src/app/common/models/cv-model';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent extends AbstractForm implements OnInit {
  CandidateId: any;
  listCV: CV[];
  CVItemToView: CV;
  newCVTitle = 'New CV Title';
  @Input() cv: CV;

  constructor(private route: ActivatedRoute,
              private searchCVServiceService: SearchCVServiceService,
              private routerService: Router,
              private userService: UserService,
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
  receivedOnCVItemClick($event) {
    this.CVItemToView = $event;
  }
  getActiveCV() {
    this.CVItemToView = this.listCV.find((item) => item.active === true);
  }
  getActiveUser() {
    this.userService.getActiveUser().subscribe((user) => {
      console.log(user);
    });
  }
}
