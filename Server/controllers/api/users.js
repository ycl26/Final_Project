
"use strict";

const companies = require('../../models/company'); // Model object
const candidates = require('../../models/candidate'); // Model object

const COMPANY = 'Company';
const CANDIDATE = 'Candidate';
const GUEST = 'Guest';

function _findUser(collection, query) {
    return new Promise(function (resolve, reject) {
        collection.find(query, function (err, data) {
            if (err) {
                reject('There is server internal error');
            } else if (data.length < 1) {
                return reject(null);
            } else {
                resolve(data);
            }
        })
    })
}

const tryToFindInCompanies = (query) => _findUser(companies, query);
const tryToFindInCandidates = (query) => _findUser(candidates, query);


// Wrap all the methods in an object
function doUserLogin(req, res) {
    var email = req.body.email;
    var psw = req.body.psw;
    var query = { userEmail: email, password: psw };
    tryToFindInCompanies(query).then((company) => {
        const data = {
            companyName: company.companyName,
            email: company.userEmail,
            type: COMPANY,
        };
        res.send({
            data: data
        });
    }, (error) => {
        return tryToFindInCandidates(query);
    }).then((candidate) => {
        const data = {
            firstName: candidate.firstName,
            lastName: candidate.lastName,
            email: candidate.userEmail,
            type: CANDIDATE,
        };
        res.send({
            data: data
        });
    }, (error) => {
        res.status(204).send({ errorMessage: error });
    });
}

function doForgotPassword(req, res) {
    var email = req.body.email;
    var query = { userEmail: email };

    tryToFindInCompanies(query).then((data) => {
        res.status(200).send({ data: data }); // Return all the data from DB
    }, (error) => {
        return tryToFindInCandidates(query);
    }).then((user) => {
        res.status(200).send({ data: user.password });// Return all the data from DB
    }, (error) => {
        res.status(204).send({ errorMessage: error });
    });
}

function doCompanySignUp(req, res, next) {
    console.log("doCompanySignUp");
    var company = new companies({
        companyName: req.body.companyName,
        userEmail: req.body.email,
        password: req.body.psw,
    });

    company.save(function (err, createdCompany) {
        if (err) {
            res.status(500).send({ message: "Some error ocuured while creating the company." });
        } else {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            const data = {
                companyName: createdCompany.companyName,
                email: createdCompany.userEmail,
                type: COMPANY,
            };
            res.send({
                data: data
            });
        }
    });
}

function doCandidateSignUp(req, res, next) {
    var candidate = new candidates({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.email,
        password: req.body.psw,
    });
    candidate.save(function (err, createdCandidate) {
        if (err) {
            res.status(500).send({ message: "Some error ocuured while creating the candidate." });
        } else {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
            const data = {
                firstName: createdCandidate.firstName,
                lastName: createdCandidate.lastName,
                email: createdCandidate.userEmail,
                type: CANDIDATE,
            };
            res.send({
                data: data
            });
        }
    });
}


module.exports = {
    onUserLogin: doUserLogin,
    onForgotPassword: doForgotPassword,
    onCandidateSignUp: doCandidateSignUp,
    onCompanySignUp: doCompanySignUp
};
