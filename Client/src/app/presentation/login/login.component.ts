import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Company, Candidate, UserType, User } from '../../common/models/user-model';
import { createDefaultCandidate, createDefaultCompany, createDefaultUser } from 'src/app/common/factories/user-factory';
import { UserService, Error } from 'src/app/common/services/user.service';



const LOGIN = 'Login';
const SIGN_UP = 'SignUp';
const FORGOT_PASSWORD = 'Forgot password';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly CANDIDATE = UserType.Candidate;
  readonly COMPANY = UserType.Company;

  candidate: Candidate;
  company: Company;
  user: User;
  errorMessage: string;

  title = 'MyCVOnline';
  activeScreen;
  signUpType: UserType;

  constructor(
    private userService: UserService,
    private routerService: Router
  ) {
    
  }

  ngOnInit() {
    this.displayLogIn();
  }


  //#region Sign Up
  displaySignUp() {
    this.candidate = createDefaultCandidate();
    this.company = createDefaultCompany();
    this.activeScreen = SIGN_UP;
    this.signUpType = this.CANDIDATE;
  }
  displayLogIn() {
    this.user = createDefaultUser();
    this.activeScreen = LOGIN;
  }
  displayForgot() {
    this.user = createDefaultUser();
    this.activeScreen = FORGOT_PASSWORD;
  }
  isSingUpScreenActive() {
    return this.activeScreen === SIGN_UP;
  }
  setSignUpType(value) {
    this.signUpType = value;
  }
  isSignUpType(type) {
    return this.signUpType === type;
  }
  handleSignUpUser(candidateOrCompany: Candidate | Company) {
    this.userService.signup(candidateOrCompany).subscribe((userOrError: Candidate | Company | Error) => {
      switch (userOrError.type) {
        case UserType.Candidate:
          this.routerService.navigate(['jobOffers']); break;
        case UserType.Company:
          this.routerService.navigate(['listOfcandidates']); break;
        default:
          this.errorMessage = userOrError.errorMessage;
      }
    });
  }
  //#endregion

  //#region Log In
  isLogInScreenActive() {
    return this.activeScreen === LOGIN;
  }
  //#endregion

  //#region forgot passwrod
  isForgotScreenActive() {
    return this.activeScreen === FORGOT_PASSWORD;
  }
  //#endregion

  handleForgotPassword() {
    // this.logInService.forgotPSW(this.user.email).subscribe((response) => {

    //   switch(response.status) {
    //     case 200 :  alert(`this is your password: ${response.body}`); break;
    //     case 204 :  alert(`user not found`); break;
    //     case 500 :  alert(response.body); break;
    //   }
    // });
  }

  handleLogin() {
      this.userService.login(this.user.email, this.user.psw).subscribe((userOrError) => {
        switch (userOrError.type) {
          case UserType.Candidate:
            this.routerService.navigate(['jobOffers']); break;
          case UserType.Company:
            this.routerService.navigate(['listOfcandidates']); break;
          default:
            this.errorMessage = userOrError.errorMessage;
        }
      });
  }
}


