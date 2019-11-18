import { Injectable } from '@angular/core';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SearchCVServiceService {
  cacheCV: any[];
  constructor() {
    this.cacheCV = this._createMockCV();
  }


  getListCV(UserId: string) {

    return of(this.cacheCV);
  }
  _createMockCV() {
    let i = 0;
    return [
      { id: i++, title: 'engineer', profile: 'wuhgfviwuegfvpiefv', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false },
      { id: i++, title: 'developper', profile: 'wuhgfviwuegfvpiefv', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:true  },
      { id: i++, title: 'cosmonauta', profile: 'wuhgfviwuegfvpiefv', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false },
      { id: i++, title: 'quitaNieve', profile: 'wuhgfviwuegfvpiefv', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false},
      { id: i++, title: 'tester', profile: 'wuhgfviwuegfvpiefv', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false },

    ]
  }
}
