import { Component, OnInit } from '@angular/core';
import {Route} from '@angular/router';
import { Company, Candidate } from './loginModel';



const LOGIN = 'Login';
const SIGN_UP = 'SignUp';
const FORGOT_PASSWORD = 'Forgot password';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: Candidate = this.createDefaultUser();
  company: Company= this.createDefaultCompany();
  title = 'MyCVOnline';
  activeScreen = LOGIN;
  userTypeCand=true; 
  

  constructor() {
    console.log(this.user);
  }
  createDefaultUser(): Candidate {
    return {
      email: '',
      firstName: '',
      lastName: '',
      psw: ''
    }
  }
  createDefaultCompany(): Company {
    return {
      email: '',
      companyName: '',     
      psw: ''
    }
  }
  displaySingUp(){
    this.user = this.createDefaultUser();
    this.activeScreen = SIGN_UP;
  }
  displayLogIn(){
    this.user = this.createDefaultUser();
    this.activeScreen = LOGIN;
  }
  displayForgot(){
    this.user = this.createDefaultUser();
    this.activeScreen = FORGOT_PASSWORD;
  }
  isSingUpScreenActive(){
    return this.activeScreen === SIGN_UP;
  }
  isLogInScreenActive(){
    return this.activeScreen === LOGIN;
  }
  isForgotScreenActive(){
    return this.activeScreen === FORGOT_PASSWORD;
  }
  setUserTypeCan(value){
this.userTypeCand=value;
  }


  handleSaveUser(userTypeC) {
    userTypeC 
    if(userTypeC) { 
      // user type is a candidate
      //this.logInService.saveUser(this.user).subscribe(() => {
      //   alert('user has been signed up');
      //   this.user = this.createDefaultUser();
      // }, 
      // (error) => {
      //   alert('error');
      // });
    }else{
      //this.logInService.saveCompany(this.company).subscribe(() => {
      //   alert('company has been signed up');
      //   this.company = this.createDefaultCompany();
      // }, 
      // (error) => {
      //   alert('error');
      // });

    } 

  
  }
  

  handleForgotPassword(){
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


