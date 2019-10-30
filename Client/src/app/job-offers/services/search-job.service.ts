import { Injectable } from '@angular/core';
import { of } from 'rxjs';

const filter = (predicate, array:any) => {
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
    const filteredJobs = filter(byName, this.cacheJobs);
    console.log(filteredJobs);
    return of(filteredJobs);
  }

  createMockJobs() {
    let i = 0;
    return [
      { id: i++, name: 'expedia' },
      { id: i++, name: 'cgi' },
      { id: i++, name: 'bnp' },
      { id: i++, name: 'bca' },
      { id: i++, name: 'it' },

    ]
  }
}
