import { UserType, Guest, Candidate, Company, User } from '../models/user-model';

export const createDefaultGuest = () => {
  return {
    type: UserType.Guest
  } as Guest;
};

export const createDefaultUser = () => {
  return {
  } as User;
};

export const createDefaultCandidate = (): Candidate => {
  return {
    email: '',
    firstName: '',
    lastName: '',
    psw: '',
    type: UserType.Candidate,
    cvList: []
  };
};

export const createDefaultCompany = (): Company => {
  return {
    email: '',
    companyName: '',
    psw: '',
    type: UserType.Company,
    jobOffersList: []
  };
};
