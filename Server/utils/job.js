import * as companyModel from './company';

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

export const toPlainObject = (job, company) => {
  return {
    title: job.title,
    date: job.date,
    description: job.description,
    type: job.type,
    companyLogo: job.companyLogo,
    companyName: job.companyName,
    company: company
  };
};

export const findByTitle = (title, withCandidate) => {
  // const result = Job
  //   .findOne({ title });
  // return withCandidate
  //   ? result.populate('company') // todo to figure out how
  //   : result;
  return Job
    .findOne({title})
    .then(toPlainObject);
};

export function createJobOffer(job) {
  const newJob = new Job({
    title: job.title,
    date: job.date,
    description: job.description,
    type: job.type,
    companyLogo: job.companyLogo,
    companyName: job.companyName,
  });
  return newJob.save().then((createdJob) => {
    return companyModel.findByCompanyName(createdJob.companyName)
      .then((foundCompany) => {
        if (foundCompany) {
          // The below two lines will add the newly saved review's
          // ObjectID to the the User's reviews array field
          foundCompany.CVs.push(createdJob);
          foundCompany.save();
          return toPlainObject(
            createdJob,
            companyModel.toPlainObject(foundCompany)
          );
        }
      });
  });
}
