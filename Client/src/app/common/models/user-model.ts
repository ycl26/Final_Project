import {CV} from './cv-model';
import {Job} from './job-model';

export enum UserType {
  Company = 'Company',
  Candidate = 'Candidate',
  Guest = 'Guest',
}

export class User {
  userEmail: string;
  psw: string;
  // type:UserType;
}

export class Candidate extends User {
  firstName: string;
  lastName: string;
  type: UserType.Candidate;
  cvList: CV[];
}

export class Company extends User {
  companyName: string;
  type: UserType.Company;
  jobOffersList: Job[];
  address: string;
}

export class Guest extends User {
  type: UserType.Guest;
}

export type ActiveUser = Candidate | Company | Guest;
