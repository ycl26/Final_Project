import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService extends Subject<{type: string, payload: any}> {

  dispatch(event: {type: string, payload: any}) {
    this.next(event);
  }
}
