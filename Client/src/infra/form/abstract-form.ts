import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

export class AbstractForm implements OnDestroy {
  _unsubscribe$: Subject<any> = new Subject();

  constructor() { }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}