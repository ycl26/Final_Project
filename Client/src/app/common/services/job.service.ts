import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Error } from './user.service';
import { handleResponse } from '../utils/http-utils';
import { apiUrl } from '../utils/constants';
import { Job } from '../models/job-model';


@Injectable({
  providedIn: 'root'
})
export class jobService {

  constructor(private httpClient: HttpClient) {
  }

  upsertJob(job: Job | {userEmail: string}) {
    const result$ = this.httpClient.post(`${apiUrl}/job/upsert`, job, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
    );
  }
 
  removeJob(id: string) {
    const result$ = this.httpClient.post(`${apiUrl}/job/remove`, {id}, { observe: 'response', withCredentials: true });
    return result$.pipe(
      map(handleResponse),
    );
  }

  getListJob(userEmail: string) {
    const result$ = this.httpClient.get(`${apiUrl}/company/jobs`, {
      params: { userEmail },
      observe: 'response',
      withCredentials: true
    });
    return result$.pipe(
      map(handleResponse),
    );
  }

  findByTitle(title: string) {
    const result$ = this.httpClient.get(`${apiUrl}/job/findbytitle`, {
      params: { title },
      observe: 'response',
      withCredentials: true
    });
    return result$.pipe(
      map(handleResponse),
    );
  }
}
