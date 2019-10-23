import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Candidate, Company } from '../login/logInModel';

const apiUrl = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class LogInServService {

  constructor(private httpClient: HttpClient) { }

  saveUser(user: Candidate) {
    return this.httpClient.post(`${apiUrl}/signUp`, user, {observe: 'response'});
  }
  saveCompany(user: Company) {
    return this.httpClient.post(`${apiUrl}/signUp`, user, {observe: 'response'});
  }

  login(email: string, psw: string, type: string) {
    return this.httpClient.post(`${apiUrl}/login`, {email, psw, type}, {observe: 'response'});
  }
  
  forgotPSW(email: string) {
    return this.httpClient.post(`${apiUrl}/forgotPSW`, {email}, {observe: 'response'})
  }
}
