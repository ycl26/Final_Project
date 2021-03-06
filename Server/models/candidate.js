const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import * as candidateUtils from '../utils/candidate';

// read https://mongoosejs.com/docs/guide.html#selectPopulatedPaths
const Candidate = mongoose.model('Candidate', {
  firstName: String,
  lastName: String,
  userEmail: String,
  password: String,
  CVs: [{ type: Schema.Types.ObjectId, ref: 'CV' }]
});

export const findById = (id) => Candidate
  .findOne({ _id: id })
  .then(candidateUtils.toPlainObject);

export const findByEmail = (userEmail, shouldPopulateCVs) => {
  const result = Candidate
    .findOne({ userEmail });
  return shouldPopulateCVs
    ? result.populate('CVs')
    : result;
};

export const addCV = (userEmail, newCv) => {
  return new Promise((resolve, reject) => {
    Candidate.findOneAndUpdate({ userEmail },
    {
      "$push": { "CVs": newCv._id }
    },
    { "new": true, "upsert": true },
    function (err, foundCandidate) {
      if (err) {
        reject(err);
      }
      resolve(candidateUtils.toPlainObject(foundCandidate));
    });
  });
};

export const __findByUserEmailAndPassword = (userEmail, password) => {
  return Candidate
    .findOne({ userEmail, password })
    .then(candidateUtils.toPlainObject);
};

export const __getPasswordByUserEmail = (userEmail) => {
  return Candidate
    .findOne({ userEmail })
    .then((candidate) => candidate.password);
};

export const createCandidate = (candidate) => {
  const newCandidate = new Candidate({
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    userEmail: candidate.userEmail,
    password: candidate.password,
  });
  return newCandidate.save()
    .then(candidateUtils.toPlainObject);
};
