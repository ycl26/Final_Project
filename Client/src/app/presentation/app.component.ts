import { Component } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { User, UserType } from '../common/models/user-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  user: User;
  constructor(private userService: UserService) {
    this.user = this.userService.getActiveUser();
  }

  isGuest() {
    return this.user.type === UserType.Guest;
  }
}
