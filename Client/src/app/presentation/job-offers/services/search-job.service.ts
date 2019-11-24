import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const filter = (predicate, array: any) => {
  let result = [];
  for (let index = 0; index < array.length; index++) {
    if (predicate(array[index])) {
      result.push(array[index]);
    }
  }
  return result;
}

@Injectable({
  providedIn: 'root'
})
export class SearchJobService {

  cacheJobs: any[];

  constructor() {
    this.cacheJobs = this._createMockJobs();
  }

  getJobs(jobName: string) {
    const byName = (job) => job.title.indexOf(jobName) > -1; 
    // const filteredJobs = this.cacheJobs.filter(byName);
    let filteredJobs = [];
    if (jobName == undefined) {

      filteredJobs = this.cacheJobs;
    } else {
      filteredJobs = filter(byName, this.cacheJobs);
    }
    console.log("jobName:",jobName);
    return of(filteredJobs);
  }

  _createMockJobs() {
    let i = 0;
    return [
      { id: i++, title: 'expedia', date: '20-02-19', description: 'this is the description of the job',type:'Permanent',companyLogo:'../assets/img/logo.png' },
      { id: i++, title: 'cgi', date: '20-02-19', description: 'this is the description of the job',type:'Permanent' },
      { id: i++, title: 'bnp', date: '20-02-19', description: 'this is the description of the job',type:'Permanent' },
      { id: i++, title: 'bca', date: '20-02-19', description: 'this is the description of the job',type:'Permanent' },
      { id: i++, title: 'it', date: '20-02-19', description: 'this is the description of the job',type:'Permanent' },

    ]
  }
}
