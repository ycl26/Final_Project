import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Guest, Candidate, Company, User, UserType, ActiveUser } from '../models/user-model';

import { createDefaultGuest, createDefaultUser } from '../factories/user-factory';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

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
  _user$ = new BehaviorSubject<ActiveUser>(createDefaultGuest());
  constructor(private httpClient: HttpClient) {
    this._updateActiveUser = this._updateActiveUser.bind(this);
  }

  initialize() {
    return this._getCurrentAuthenticatedUser();
  }

  _getCurrentAuthenticatedUser() {
    const result$ = this.httpClient.get(`${apiUrl}/userinfo`, { observe: 'response', withCredentials: true});
    return result$.pipe(
      tap((authenticatedUser) => {
        // maybe check for schema
        if (authenticatedUser) {
          this._user$.next(authenticatedUser as any);
        }
      })
    );
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
    const result$ = this.httpClient.post(url, candidateOrCompany, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    );
  }

  login(email: string, psw: string): Observable<Candidate | Company | Error> {
    const result$ = this.httpClient.post(`${apiUrl}/login`, { email, psw }, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    )
  }

  logout() {
    const result$ = this.httpClient.post(`${apiUrl}/logout`, { observe: 'response', withCredentials: true });
    result$.pipe(
      map(handleResponse),
      map(() => {
        const guest = createDefaultGuest();
        this._user$.next(<any>guest);
        return guest;
      })
    ).subscribe(() => {})
  }

  forgotPSW(email: string): Observable<URL> {
    const result$ = this.httpClient.post(`${apiUrl}/forgotPSW`, { email }, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse)
    )
  }
}  
