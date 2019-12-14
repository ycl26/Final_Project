// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';
const Company = require('./models/company'); // Model object
const Candidate = require('./models/candidate'); // Model object

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
  Candidate.collection.deleteMany({})
}

function insertCandidates() {
  Candidate.collection.insertMany([
    {
      firstName: 'Yulien',
      lastName: 'Cabrera',
      userEmail: 'yulienc@myproject.com',
      password: 'yulien'
    },
    {
      firstName: 'a',
      lastName: 'a',
      userEmail: 'a',
      password: 'a'
    },
    {
      firstName: 'b',
      lastName: 'b',
      userEmail: 'b',
      password: 'b'
    },
  ]);
}

function deleteCompanies() {
  Company.collection.deleteMany({})
}
function insertCompanies() {
  Company.collection.insertMany([
    {
      companyName: 'A',
      userEmail: 'A',
      password: 'A'
    },
    {
      companyName: 'B',
      userEmail: 'B',
      password: 'B'
    },
    {
      companyName: 'C',
      userEmail: 'C',
      password: 'C'
    },
  ]);
}
