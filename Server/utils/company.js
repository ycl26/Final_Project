import {COMPANY} from '../constants/user.constants';
import * as jobUtils from './job';

export const toPlainObject = (company) => {
  return {
    companyName: company.companyName,
    userEmail: company.userEmail,
    // jobOffers: company.jobOffers && company.jobOffers.map(jobUtils.toPlainObject),
    type: COMPANY,
  };
};
