import * as cvUtil from './cv';
import {CANDIDATE} from '../constants/user.constants';

export const toPlainObject = (candidate) => {
  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    userEmail: candidate.userEmail,
    // CVs: candidate.CVs && candidate.CVs.map(cvUtil.toPlainObject),
    type: CANDIDATE,
  };
};
