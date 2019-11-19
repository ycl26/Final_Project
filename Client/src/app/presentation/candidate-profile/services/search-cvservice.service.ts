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
      { id: i++, title: 'engineer', profile: 'here goes your introduction', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false,languages:'English, French, Spanish' },
      { id: i++, title: 'developper', profile: 'here goes your introduction', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:true,languages:'English, French, Spanish'  },
      { id: i++, title: 'cosmonauta', profile: 'here goes your introduction', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false,languages:'English, French, Spanish' },
      { id: i++, title: 'quitaNieve', profile: 'here goes your introduction', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false,languages:'English, French, Spanish'},
      { id: i++, title: 'tester', profile: 'here goes your introduction', workExp: 'this is the description of the cv', education: 'bruto muy bruto',active:false,languages:'English, French, Spanish' },

    ]
  }
}
