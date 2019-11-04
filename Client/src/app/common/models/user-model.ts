export enum UserType {
    Company = 'Company',
    Candidate = 'Candidate',
    Guest = 'Guest',
}

export class User {
    email: string;
    psw: string;
}

export class Candidate extends User {
    firstName: string;
    lastName: string;
    type: UserType.Candidate
}

export class Company extends User {
    companyName: string;
    type: UserType.Company
}

export class Guest extends User {
    type: UserType.Guest
}

export type ActiveUser = Candidate | Company | Guest;