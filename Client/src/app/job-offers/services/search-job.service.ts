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
    this.cacheJobs = this.createMockJobs();
  }

  getJobs(jobName: string) {
    const byName = (job) => job.name.indexOf(jobName) > -1; //why > -1?
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

  createMockJobs() {
    let i = 0;
    return [
      { id: i++, name: 'expedia', date: '20-02-19', description: 'this is the description of the job',companyLogo:'../assets/img/logo.png' },
      { id: i++, name: 'cgi', date: '20-02-19', description: 'this is the description of the job' },
      { id: i++, name: 'bnp', date: '20-02-19', description: 'this is the description of the job' },
      { id: i++, name: 'bca', date: '20-02-19', description: 'this is the description of the job' },
      { id: i++, name: 'it', date: '20-02-19', description: 'this is the description of the job' },

    ]
  }
}
