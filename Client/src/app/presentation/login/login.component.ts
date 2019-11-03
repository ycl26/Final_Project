import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { Company, Candidate } from '../../common/models/user-model';
import { createDefaultCandidate } from 'src/app/common/factories/user-factory';



const LOGIN = 'Login';
const SIGN_UP = 'SignUp';
const FORGOT_PASSWORD = 'Forgot password';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  candidate: Candidate;
  company: Company;
  title = 'MyCVOnline';
  activeScreen = LOGIN;
  userTypeCand = true;

  constructor() {
    console.log(this.candidate);
  }

  displaySingUp() {
    this.candidate = createDefaultCandidate();
    this.activeScreen = SIGN_UP;
  }
  displayLogIn() {
    this.candidate = createDefaultCandidate();
    this.activeScreen = LOGIN;
  }
  displayForgot() {
    this.candidate = createDefaultCandidate();
    this.activeScreen = FORGOT_PASSWORD;
  }
  isSingUpScreenActive() {
    return this.activeScreen === SIGN_UP;
  }
  isLogInScreenActive() {
    return this.activeScreen === LOGIN;
  }
  isForgotScreenActive() {
    return this.activeScreen === FORGOT_PASSWORD;
  }
  setUserTypeCan(value) {
    this.userTypeCand = value;
  }


  handleSaveUser(userTypeC) {
    userTypeC
    if (userTypeC) {
      // user type is a candidate
      //this.logInService.saveUser(this.user).subscribe(() => {
      //   alert('user has been signed up');
      //   this.user = this.createDefaultUser();
      // }, 
      // (error) => {
      //   alert('error');
      // });
    } else {
      //this.logInService.saveCompany(this.company).subscribe(() => {
      //   alert('company has been signed up');
      //   this.company = this.createDefaultCompany();
      // }, 
      // (error) => {
      //   alert('error');
      // });

    }


  }


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
    //   this.logInService.login(this.user.email, this.user.psw).subscribe((response) => {
    //     switch(response.status) {
    //       case 200 :  alert('the user has been logged in'); break;
    //       case 204 :  alert(`user not found`); break;
    //       case 500 :  alert(response.body); break;
    //     }

    //   });
  }
}


