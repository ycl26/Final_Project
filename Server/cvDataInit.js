require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';
const companyModel = require('./models/company'); // Model object
const candidateModel = require('./models/candidate'); // Model object
const cvModel = require('./models/cv'); // Model object
const jobModel = require('./models/job'); // Model object

mongoose.connect('mongodb://localhost:27017/' + dbname);
const db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on('error', console.error); // If there is an error in connectivity
db.once('open', () => {
  deleteCandidates();
  insertCandidates();

  deleteCompanies();
  insertCompanies();
}); // If the connections to the mongo DB was succeeded.

// step 3: Create the model with blueprint of the data to be stored in the DB

function deleteCandidates() {
  // Candidate.collection.deleteMany({})
}

function insertCandidates() {
  candidateModel.createCandidate({
    firstName: 'Yulien',
    lastName: 'Cabrera',
    userEmail: 'yulienc@myproject.com',
    password: 'yulien',
  });
  candidateModel.createCandidate({
    firstName: 'a',
    lastName: 'a',
    userEmail: 'a',
    password: 'a',
    CVs: [],
  });
  candidateModel.createCandidate({
    firstName: 'b',
    lastName: 'b',
    userEmail: 'b',
    password: 'b',
    CVs: [],
  });
}

function deleteCompanies() {
  // Company.collection.deleteMany({});
}

function insertCompanies() {
  companyModel.createCompany({
    companyName: 'A',
    userEmail: 'A',
    password: 'A'
  });
  companyModel.createCompany({
    companyName: 'B',
    userEmail: 'B',
    password: 'B'
  });
  companyModel.createCompany({
    companyName: 'C',
    userEmail: 'C',
    password: 'C'
  });
}


function insertCV() {
  cvModel.createCV({
    title: 'a',
    profile: 'a',
    workExp: 'a',
    education: 'a',
    active: 'a',
    languages: 'a',
    userEmail: 'A' // Candidate reference
  });
  cvModel.createCV({
    title: 'b',
    profile: 'b',
    workExp: 'b',
    education: 'b',
    active: 'b',
    languages: 'b',
    userEmail: 'b' // Candidate reference
  });
  cvModel.createCV({
    title: 'c',
    profile: 'c',
    workExp: 'c',
    education: 'c',
    active: 'c',
    languages: 'c',
    userEmail: 'c' // Candidate reference
  });
}

function insertJob() {
  jobModel.createJobOffer({
    title: 'a',
    date: 'a',
    description: 'a',
    type: 'a',
    companyLogo: 'a',
    companyName: 'A',
  });
  jobModel.createJobOffer({
    title: 'b',
    date: 'b',
    description: 'b',
    type: 'b',
    companyLogo: 'b',
    companyName: 'B',
  });
  jobModel.createJobOffer({
    title: 'c',
    date: 'c',
    description: 'c',
    type: 'c',
    companyLogo: 'c',
    companyName: 'C',
  });
}
