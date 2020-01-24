import * as companyModel from './company';
import * as jobUtils from '../utils/job';
import * as companyUtils from '../utils/company';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jobSchema = Schema({
  title: String,
  date: String,
  description: String,
  salary: String,
  reqSkills: String,
  type: String,
  companyLogo: String,
  address: String,
  compName: String, // ref to Company
  userEmail: String // Company ref
});
const Job = mongoose.model('Job', jobSchema);

export const findByTitle = (title, withCandidate) => {
  // const result = Job
  //   .findOne({ title });
  // return withCandidate
  //   ? result.populate('company') // todo to figure out how
  //   : result;
  return Job
    .findOne({ title })
    .then(jobUtils.toPlainObject);
};

export const getAllByUserEmail = (userEmail) => {
  return Job
    .find({ userEmail })
    .then((foundJobs) => {
      const jobs = foundJobs && foundJobs.map(jobUtils.toPlainObject);
      return jobs;
    });
};
export const getAllJobs = () => {
  return Job
    .find({})
    .then((foundJobs) => {
      const jobs = foundJobs && foundJobs.map(jobUtils.toPlainObject);
      return jobs;
    });
};
export function createJobOffer(job) {
  const newJob = new Job({
    title: job.title,
    date: job.date,
    description: job.description,
    type: job.type,
    salary: job.salary,
    reqSkills: job.reqSkills,
    companyLogo: job.companyLogo,
    compName: job.compName,
    userEmail: job.userEmail,
  });
  return newJob.save().then((createdJob) => {
    return companyModel.findByUserEmail(createdJob.userEmail)
      .then((foundCompany) => {
        if (foundCompany) {
          // The below two lines will add the newly saved review's
          // ObjectID to the the User's reviews array field
          foundCompany.Jobs.push(createdJob);
          foundCompany.save();
          return jobUtils.toPlainObject(
            createdJob,
            companyUtils.toPlainObject(foundCompany)
          );
        }
      });
  });
}


export function upsertJob(job) {
  const id = mongoose.Types.ObjectId(job.id);
  return new Promise((resolve, reject) => {
    Job.findByIdAndUpdate(
      id,
      {
        $set: {
          title: job.title,
          date: job.date,
          description: job.description,
          type: job.type,
          salary: job.salary,
          reqSkills: job.reqSkills,
          companyLogo: job.companyLogo,
          compName: job.compName,
          address: job.address,
          userEmail: job.userEmail,
        }
      },
      { new: true, upsert: true },
      function (err, newOrUpdatedJob) {
        if (err) {
          reject(err);
          return;
        }
        resolve(jobUtils.toPlainObject(newOrUpdatedJob));
      });
  });
}

export function removeJob(job) {
  const id = mongoose.Types.ObjectId(job.id);
  return new Promise((resolve, reject) => {
    Job.findByIdAndRemove(
      id,
      function (err, removeJob) {
        if (err) {
          reject(err);
          return
        }
        resolve(jobUtils.toPlainObject(removeJob));
      });
  });
}
