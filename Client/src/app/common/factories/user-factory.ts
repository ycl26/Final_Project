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
    userEmail: '',
    firstName: '',
    lastName: '',
    psw: '',
    type: UserType.Candidate,
    cvList: []
  };
};

export const createDefaultCompany = (): Company => {
  return {
    userEmail: '',
    companyName: '',
    address: '',
    psw: '',
    type: UserType.Company,
    jobOffersList: [],   
  };
};
