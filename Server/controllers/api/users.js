
"use strict";

var companies = require('../../models/company'); // Model object
var candidates = require('../../models/candidate'); // Model object

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
    tryToFindInCompanies(query).then((data) => {
        res.status(200).send({ data: data }); // Return all the data from DB
    }, (error) => {
        return tryToFindInCandidates(query);
    }).then((data) => {
        res.status(200).send({ data: data }); // Return all the data from DB
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
    }).then((data) => {
        res.status(200).send({ psw: user.password });// Return all the data from DB
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

    company.save(function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error ocuured while creating the Note." });
        } else {
            res.send(data);
            console.log(data);
        }
    });
}

function doCandidateSignUp(req, res, next) {
    console.log("doCandidateSignUp");
    var candidate = new candidates({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.email,
        password: req.body.psw,
    });
    candidate.save(function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error ocuured while creating the Note." });
        } else {
            res.send(data);
            console.log(data);
        }
    });
}


module.exports = {
    onUserLogin: doUserLogin,
    onForgotPassword: doForgotPassword,
    onCandidateSignUp: doCandidateSignUp,
    onCompanySignUp: doCompanySignUp
};
