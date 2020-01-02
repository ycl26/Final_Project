import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Error } from './user.service';
import { handleResponse } from '../utils/http-utils';
import { apiUrl } from '../utils/constants';
import { CV } from '../models/cv-model';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) {
  }

  upsertCV(cv: CV | {userEmail: string}) {
    const result$ = this.httpClient.post(`${apiUrl}/cv/upsert`, cv, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
    );
  }
 
  removeCV(id: string) {
    const result$ = this.httpClient.post(`${apiUrl}/cv/remove`, {id}, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
    );
  }

  getListCV(userEmail: string) {
    const result$ = this.httpClient.get(`${apiUrl}/candidate/cvs`, {
      params: { userEmail },
      observe: 'response',
      withCredentials: true
    });
    return result$.pipe(
      map(handleResponse),
    );
  }

  findByTitle(title: string) {
    const result$ = this.httpClient.get(`${apiUrl}/cv/findbytitle`, {
      params: { title },
      observe: 'response',
      withCredentials: true
    });
    return result$.pipe(
      map(handleResponse),
    );
  }
}
