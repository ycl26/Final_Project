require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';
const candidateModel = require('./models/candidate'); // Model object

mongoose.connect('mongodb://localhost:27017/' + dbname);
const db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on('error', console.error); // If there is an error in connectivity
db.once('open', () => {
  insertCandidates();
}); // If the connections to the mongo DB was succeeded.

// step 3: Create the model with blueprint of the data to be stored in the DB
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
