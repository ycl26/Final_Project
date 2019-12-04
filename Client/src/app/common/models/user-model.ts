import { cv } from './cv-model';
import { Job } from './job-model';

export enum UserType {
    Company = 'Company',
    Candidate = 'Candidate',
    Guest = 'Guest',
}

export class User {
    email: string;
    psw: string;
    // type:UserType;
}

export class Candidate extends User {
    firstName: string;
    lastName: string;
    type: UserType.Candidate
    cvList:cv[];
}

export class Company extends User {
    companyName: string;
    type: UserType.Company;
    jobOffersList:Job[];
}

export class Guest extends User {
    type: UserType.Guest
}

export type ActiveUser = Candidate | Company | Guest;