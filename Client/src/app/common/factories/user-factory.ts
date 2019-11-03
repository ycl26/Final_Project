import { UserType, Guest, Candidate, Company } from "../models/user-model";

export const createDefaultGuest = () => {
  return {
    type: UserType.Guest
  } as Guest;
}

export const createDefaultCandidate = (): Candidate => {
  return {
    email: '',
    firstName: '',
    lastName: '',
    psw: '',
    type: UserType.Candidate,
  }
}

export const createDefaultCompany = (): Company => {
  return {
    email: '',
    companyName: '',
    psw: '',
    type: UserType.Company,
  }
}