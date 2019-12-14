import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Error} from './user.service';
import {handleResponse} from '../utils/http-utils';
import {apiUrl} from '../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) {
  }

  createCV(cv) {
    const result$ = this.httpClient.post(`${apiUrl}/createCV` , cv, {observe: 'response', withCredentials: true});
    return result$.pipe(
      map(handleResponse),
      map((createdCV) => console.log(createdCV))
    );
  }
}
