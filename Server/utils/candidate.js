import * as cvModel from '../models/cv';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import {CANDIDATE, COMPANY} from '../constants/user.constants';

// read https://mongoosejs.com/docs/guide.html#selectPopulatedPaths
const Candidate = mongoose.model('Candidate', {
  firstName: String,
  lastName: String,
  userEmail: String,
  password: String,
  CVs: [{type: Schema.Types.ObjectId, ref: 'CV'}]
});

export const toPlainObject = (candidate) => {
  return {
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    userEmail: candidate.userEmail,
    CVs: candidate.CVs.map(cvModel.toPlainObject),
    type: COMPANY,
  };
};

export const findById = (id) => Candidate
  .findOne({ _id: id })
  .then(toPlainObject);

export const findByEmail = (userEmail, withCVs) => {
  const result = Candidate
    .findOne({userEmail});
  return withCVs
    ? result.populate('CVs')
    : result;
};

export const __findByUserEmailAndPassword = (userEmail, password) => {
  return Candidate
    .findOne({userEmail, password})
    .then((candidate) => ({
      ...toPlainObject(candidate),
      id: candidate._id
    }));
};

export const __getPasswordByUserEmail = (userEmail) => {
  return Candidate
    .findOne({userEmail})
    .then((candidate) => ({
      password: candidate.password
    }));
};

export const createCandidate = (candidate) => {
  const newCandidate = new Candidate({
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    userEmail: candidate.userEmail,
    password: candidate.password,
  });
  newCandidate.save()
    .then((createdCandidate) => {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      return {
        firstName: createdCandidate.firstName,
        lastName: createdCandidate.lastName,
        email: createdCandidate.userEmail,
        type: CANDIDATE,
      };
    });
};
