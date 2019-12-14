const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import {COMPANY} from '../constants/user.constants';
import * as jobModel from '../models/job';

const companySchema = Schema({
  companyName: String,
  userEmail: String,
  password: String,
  jobsOffers: [{type: Schema.Types.ObjectId, ref: 'Job'}]
});

const Company = mongoose.model('Company', companySchema);

export const toPlainObject = (company) => {
  return {
    companyName: company.companyName,
    userEmail: company.userEmail,
    jobOffers: company.jobOffers.map(jobModel.toPlainObject),
    type: COMPANY,
  };
};

export const findById = (id) => Company
  .findOne({_id: id})
  .then(toPlainObject);

export const findByCompanyName = (companyName, withJobOffers) => {
  const company = Company
    .findOne({companyName});
  const result = withJobOffers
    ? company.populate('jobsOffers')
    : company;
  return result
    .then(toPlainObject);
};

export const __findUserEmailAndPassword = (userEmail, password) => {
  return Company
    .findOne({userEmail, password})
    .then((company) => ({
      ...toPlainObject(company),
      id: company._id
    }));
};

export const __getPasswordByUserEmail = (userEmail) => {
  return Company
    .findOne({userEmail})
    .then((company) => ({
      password: company.password
    }));
};

export const createCompany = (company) => {
  const newCompany = new Company({
    companyName: company.companyName,
    userEmail: company.userEmail,
    password: company.password,
  });
  newCompany.save()
    .then(toPlainObject);
};
