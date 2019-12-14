import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Candidate, Company, UserType, ActiveUser} from '../models/user-model';

import {createDefaultGuest} from '../factories/user-factory';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/api';

type URL = string;

const handleResponse = (response: HttpResponse<any>) => {
  if (response.status === 200) {
    return response.body && (response.body as any).data as any;
  }
  if (response.status === 500) {
    return {
      type: 'Error',
      errorMessage: response.body && (response.body as any).errorMessage
    } as Error;
  }
  return {
    type: 'Error',
    errorMessage: 'server error. contact support'
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
  // tslint:disable-next-line:variable-name
  _user$ = new BehaviorSubject<ActiveUser>(createDefaultGuest());

  constructor(private httpClient: HttpClient) {
    this._updateActiveUser = this._updateActiveUser.bind(this);
  }

  initialize() {
    return this._getCurrentAuthenticatedUser();
  }

  _getCurrentAuthenticatedUser() {
    const result$ = this.httpClient.get(`${apiUrl}/userinfo`, {observe: 'response', withCredentials: true});
    return result$.pipe(
      tap((authenticatedUser) => {
        // maybe check for schema
        if (authenticatedUser) {
          this._updateActiveUser(authenticatedUser as any);
        }
      })
    );
  }

  getActiveUser(): Observable<ActiveUser> {
    return this._user$.asObservable();
  }

  _updateActiveUser(candidateOrCompany: Candidate | Company) {
    this._user$.next(candidateOrCompany);
    return candidateOrCompany;
  }

  signup(candidateOrCompany: Candidate | Company): Observable<Candidate | Company | Error> {
    const urlByType = {
      [UserType.Company]: `${apiUrl}/signUpCompany`,
      [UserType.Candidate]: `${apiUrl}/signUpCandidate`
    };
    const url = urlByType[candidateOrCompany.type];
    const result$ = this.httpClient.post(url, candidateOrCompany, {observe: 'response', withCredentials: true});
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    );
  }

  login(email: string, psw: string): Observable<Candidate | Company | Error> {
    const result$ = this.httpClient.post(`${apiUrl}/login`, {email, psw}, {observe: 'response', withCredentials: true});
    return result$.pipe(
      map(handleResponse),
      map(this._updateActiveUser)
    );
  }

  logout() {
    const result$ = this.httpClient.post(`${apiUrl}/logout`, {observe: 'response', withCredentials: true});
    result$.pipe(
      map(handleResponse),
      map(() => {
        const guest = createDefaultGuest();
        this._updateActiveUser(guest as any);
        return guest;
      })
    ).subscribe(() => {
    });
  }

  forgotPSW(email: string): Observable<URL> {
    const result$ = this.httpClient.post(`${apiUrl}/forgotPSW`, {email}, {observe: 'response', withCredentials: true});
    return result$.pipe(
      map(handleResponse)
    );
  }
}
