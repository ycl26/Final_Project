const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import * as companyUtils from '../utils/company';

const Company = mongoose.model('Company', {
  companyName: String,
  userEmail: String,
  password: String,
  jobsOffers: [{type: Schema.Types.ObjectId, ref: 'Job'}]
});

export const findById = (id) => Company
  .findOne({_id: id})
  .then(companyUtils.toPlainObject);

export const findByUserEmail = (userEmail, shouldPopulateJobOffers) => {
  const company = Company
    .findOne({userEmail});
  const result = shouldPopulateJobOffers
    ? company.populate('jobsOffers')
    : company;
  return result
    .then(companyUtils.toPlainObject);
};

export const __findUserEmailAndPassword = (userEmail, password) => {
  return Company
    .findOne({userEmail, password})
    .then(companyUtils.toPlainObject);
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
  return newCompany.save()
    .then(companyUtils.toPlainObject);
};
