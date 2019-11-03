import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Guest, Candidate, Company, User } from '../models/user-model';

import { createDefaultGuest } from '../factories/user-factory';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api';

type URL = string;

const handleResponse = (response: HttpResponse<Object>) => {
  if(response.status === 201) {
      return response.body && (<any>response.body).data as any
  }
  if(response.status === 400) {
    return {
      errorMessage: response.body && (<any>response.body).errorMessage
    } as Error;
  }
  return {
    errorMessage: "server error. contact support"
  } as Error;
};

export class Error {
  errorMessage: string;  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _user = createDefaultGuest();

  constructor(private httpClient: HttpClient) { }

  getActiveUser(): User {
    return this._user;
  }

  signup(newUser: Candidate | Company): Observable< User | Error> {
    const result$ =  this.httpClient.post(`${apiUrl}/signUp`, newUser, {observe: 'response'}); 
    return result$.pipe(
      map(handleResponse),
     );
  }
 
  login(email: string, psw: string): Observable< Candidate | Company | Error> {
    const result$ = this.httpClient.post(`${apiUrl}/login`, {email, psw}, {observe: 'response'});
    return result$.pipe(
      map(handleResponse)
    )
  }
  
  forgotPSW(email: string): Observable<URL> {
    const result$ = this.httpClient.post(`${apiUrl}/forgotPSW`, {email}, {observe: 'response'});
    return result$.pipe(
      map(handleResponse)
    )
  }
}  
