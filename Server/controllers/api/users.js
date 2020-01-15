'use strict';
import {AUTHENTICATION} from '../../constants/auth.constants';
import * as companyModel from '../../models/company';
import * as candidateModel from '../../models/candidate';

const Cookies = require('cookies');

const cookiesKeys = ['cvOnlinePlatform somekey'];

const setCookies = (req, res, key, value) => {
  // res.cookie('authentication', company.id, {
  //     maxAge: 2 * 60 * 60 * 60,
  //     //httpOnly: true
  // });
  const cookies = new Cookies(req, res, {keys: cookiesKeys});
  cookies.set(key, value, {
    maxAge: 2 * 60 * 60 * 60,
  });
};

const expireCookies = (req, res, key) => {
  const cookies = new Cookies(req, res, {keys: cookiesKeys});
  cookies.set(key, undefined, {
    maxAge: -1,
    expires: 0, //Date.now()
  });
};

const getCookies = (req, res, key) => {
  const cookies = new Cookies(req, res, {keys: cookiesKeys});
  return cookies.get(key);
};

function doUserLogout(req, res) {
  expireCookies(req, res, AUTHENTICATION);
  res.status(200).send({status: 'signed out'});
}

function doUserinfo(req, res) {
  const id = getCookies(req, res, AUTHENTICATION);
  if (!id) {
    res.send(null);
    res.status(200);
    return;
  }
  companyModel.findById(id).then((data) =>
      res.send({data}),
    (error) => candidateModel.findById(id).then((data) =>
        res.send({data}),
      (error) =>
        res.status(204).send({errorMessage: error})
    )
  );
}

// Wrap all the methods in an object
function doUserLogin(req, res) {
  const email = req.body.email;
  const psw = req.body.psw;

  companyModel.__findUserEmailAndPassword(email, psw)
    .then((company) => {
      const id = company.id;
      delete company.id;
      setCookies(req, res, AUTHENTICATION, id);
      res.send({
        data: company
      });
    }, (error) => {
      return candidateModel.__findByUserEmailAndPassword(email, psw).then((candidate) => {
        const id = candidate.id;
        delete candidate.id;
        setCookies(req, res, AUTHENTICATION, id);
        res.send({
          data: candidate
        });
      }, (error) => {
        expireCookies(req, res, AUTHENTICATION);
        res.status(204).send({errorMessage: error});
      });
    });
}

function doForgotPassword(req, res) {
  const userEmail = req.body.email;
  companyModel.__getPasswordByUserEmail(userEmail).then((data) => {
    res.status(200).send({data: data}); // Return all the data from DB
  }, (error) => {
    return candidateModel.__getPasswordByUserEmail(userEmail);
  }).then((user) => {
    res.status(200).send({data: user.password});// Return all the data from DB
  }, (error) => {
    res.status(204).send({errorMessage: error});
  });
}

function doCompanySignUp(req, res, next) {
  const company = {
    companyName: req.body.companyName,
    userEmail: req.body.userEmail,
    address: req.body.address,
    password: req.body.psw,    
  };
  companyModel.createCompany(company)
    .then(createdCompany => {
      const id = createdCompany.id;
        delete createdCompany.id;
        setCookies(req, res, AUTHENTICATION, id);
        res.send({
          data: createdCompany
        });
    },
      (err) => res.status(500).send({
        message: 'Some error occurred while creating the company.'
      })
    )
}

function doCandidateSignUp(req, res, next) {
  const candidate = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userEmail: req.body.userEmail,
    password: req.body.psw,
  };
  candidateModel.createCandidate(candidate)
    .then(createdCandidate => {
      const id = createdCandidate.id;
      delete createdCandidate.id;
      setCookies(req, res, AUTHENTICATION, id);
      res.send({
        data: createdCandidate
      });
    },
      (err) => res.status(500).send({
        message: 'Some error occurred while creating the candidate.'
      })
    )
}


module.exports = {
  onUserinfo: doUserinfo,
  onUserLogin: doUserLogin,
  onUserLogout: doUserLogout,
  onForgotPassword: doForgotPassword,
  onCandidateSignUp: doCandidateSignUp,
  onCompanySignUp: doCompanySignUp
};
