import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Guest, Candidate, Company, User, UserType, ActiveUser } from '../models/user-model';

import { createDefaultGuest } from '../factories/user-factory';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api';

type URL = string;

const handleResponse = (response: HttpResponse<Object>) => {
  if (response.status === 200) {
    return response.body && (<any>response.body).data as any
    console.log('here')
  }
  if (response.status === 500) {
    return {
      type: 'Error',
      errorMessage: response.body && (<any>response.body).errorMessage
    } as Error;
  }
  return {
    type: 'Error',
    errorMessage: "server error. contact support"
  } as Error;
};

export class Error {
  type: 'Error';
  errorMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _user$ = new BehaviorSubject(createDefaultGuest());

  constructor(private httpClient: HttpClient) {
    // TODO check bind
    this._updateActiveUser = this._updateActiveUser.bind(this);
  }

  getActiveUser(): Observable<ActiveUser> {
    return this._user$.asObservable();
  }

  _updateActiveUser(candidateOrCompany: Candidate | Company) {
    this._user$.next(<any>candidateOrCompany);
    return candidateOrCompany;
  }

  signup(candidateOrCompany: Candidate | Company): Observable<Candidate | Company | Error> {
    const urlByType = {
      [UserType.Company]: `${apiUrl}/signUpCompany`,
      [UserType.Candidate]: `${apiUrl}/signUpCandidate`,
    };
    const url = urlByType[candidateOrCompany.type];
    const result$ = this.httpClient.post(url, candidateOrCompany, { observe: 'response' });
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    );
  }

  login(email: string, psw: string): Observable<Candidate | Company | Error> {
    const result$ = this.httpClient.post(`${apiUrl}/login`, { email, psw }, { observe: 'response' });
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    )
  }

  forgotPSW(email: string): Observable<URL> {
    const result$ = this.httpClient.post(`${apiUrl}/forgotPSW`, { email }, { observe: 'response' });
    return result$.pipe(
      map(handleResponse)
    )
  }
}  