import * as candidateModel from './candidate';

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

export const toPlainObject = (cv) => {
  return {
    title: cv.title,
    profile: cv.profile,
    workExp: cv.workExp,
    education: cv.education,
    active: cv.active,
    languages: cv.languages,
    userEmail: cv.userEmail // Candidate reference
  };
};

export const findByTitle = (title, withCandidate) => {
  // const result = CV
  //   .findOne({ title });
  // return withCandidate
  //   ? result.populate('candidate') // todo to figure out how
  //   : result;
  return CV
    .findOne({title});
};

export function createCV(cv) {
  const newCV = new CV({
    title: cv.title,
    profile: cv.profile,
    workExp: cv.workExp,
    education: cv.education,
    active: cv.active,
    languages: cv.languages,
    userEmail: cv.userEmail // Candidate reference
  });
  return newCV.save().then((createdCV) => {
    return candidateModel.findByEmail(createdCV.userEmail)
      .then((foundCandidate) => {
        if (foundCandidate) {
          // The below two lines will add the newly saved review's
          // ObjectID to the the User's reviews array field
          foundCandidate.CVs.push(createdCV);
          foundCandidate.save();
          return {
            ...createdCV,
            candidate: {
              ...foundCandidate
            }
          };
        }
      });
  });
}
