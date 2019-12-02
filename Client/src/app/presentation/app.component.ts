import { Component } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { User, UserType, ActiveUser } from '../common/models/user-model';
import { Observable } from 'rxjs';
import { AbstractForm } from 'src/infra/form/abstract-form';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractForm {
  
  title = 'Client';
  activeUser: ActiveUser;
  constructor(private userService: UserService) {
    super();
    this._initialize();
  }

  _initialize() {
    this.userService.getActiveUser().pipe(
      takeUntil(this._unsubscribe$),
    ).subscribe((user) => {
      this.activeUser = user;
    });
  }

  isGuest() {
    return this.activeUser.type === UserType.Guest;
   }  
   isCandidate() {
    return this.activeUser.type === UserType.Candidate;
   }  
   isCompany() {
    return this.activeUser.type === UserType.Company;
   }  
 
}
