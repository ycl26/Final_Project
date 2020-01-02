import * as candidateModel from './candidate';
import * as cvUtils from '../utils/cv';
import * as candidateUtils from '../utils/candidate';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// read https://stackoverflow.com/questions/34985846/mongoose-document-references-with-a-one-to-many-relationship
const cvSchema = Schema({
  id: Number,
  title: String,
  profile: String,
  workExp: String,
  education: String,
  active: Boolean,
  languages: String,
  userEmail: String // Candidate ref
});
const CV = mongoose.model('CV', cvSchema);

export const findByTitle = (title, withCandidate) => {
  return CV
    .find({ title })
    .then((foundCVs) => {
      const cvs = foundCVs && foundCVs.map(cvUtils.toPlainObject);
      return cvs;
    });
};

export const getAllByUserEmail = (userEmail) => {
  return CV
    .find({ userEmail })
    .then((foundCVs) => {
      const cvs = foundCVs && foundCVs.map(cvUtils.toPlainObject);
      return cvs;
    });
};

export function upsertCV(cv) {
  const id = cv.id;
  return new Promise((resolve, reject) => {
    CV.findByIdAndUpdate(
      id,
      {
        "$set": {
          title: cv.title,
          profile: cv.profile,
          workExp: cv.workExp,
          education: cv.education,
          languages: cv.languages,
          userEmail: cv.userEmail
        }
      },
      { "new": true, "upsert": true },
      function (err, newOrUpdatedCV) {
        if (err) {
          reject(err);
        }
        resolve(cvUtils.toPlainObject(newOrUpdatedCV));
      });
  });
}

export function removeCV(cv) {
  const id = cv.id;
  return new Promise((resolve, reject) => {
    CV.findByIdAndRemove(
      id,
      function (err, removedCV) {
        if (err) {
          reject(err);
        }
        resolve(cvUtils.toPlainObject(removedCV));
      });
  });
}
