import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService extends Subject<{ message: string }> {

  log(message) {
    console.groupCollapsed(message);
    // tslint:disable-next-line:no-console
    console.trace();
    console.groupEnd();
    // notify
    this.next(message);
  }
}
