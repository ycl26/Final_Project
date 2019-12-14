import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  log(message) {
    console.groupCollapsed(message);
    // tslint:disable-next-line:no-console
    console.trace();
    console.groupEnd();
  }
}
