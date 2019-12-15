import * as companyModel from './company';
import * as jobUtils from '../utils/job';
import * as companyUtils from '../utils/company';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = Schema({
  title: String,
  date: Date,
  description: String,
  type: String,
  companyLogo: String,
  companyName: String, // ref to Company
});

const Job = mongoose.model('Company', jobSchema);

export const findByTitle = (title, withCandidate) => {
  // const result = Job
  //   .findOne({ title });
  // return withCandidate
  //   ? result.populate('company') // todo to figure out how
  //   : result;
  return Job
    .findOne({title})
    .then(jobUtils.toPlainObject);
};

export function createJobOffer(job) {
  const newJob = new Job({
    title: job.title,
    date: job.date,
    description: job.description,
    type: job.type,
    companyLogo: job.companyLogo,
    userEmail: job.userEmail,
  });
  return newJob.save().then((createdJob) => {
    return companyModel.findByUserEmail(createdJob.userEmail)
      .then((foundCompany) => {
        if (foundCompany) {
          // The below two lines will add the newly saved review's
          // ObjectID to the the User's reviews array field
          foundCompany.CVs.push(createdJob);
          foundCompany.save();
          return jobUtils.toPlainObject(
            createdJob,
            companyUtils.toPlainObject(foundCompany)
          );
        }
      });
  });
}
