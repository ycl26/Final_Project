require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';

const cvModel = require('./models/cv'); // Model object

mongoose.connect('mongodb://localhost:27017/' + dbname);
const db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on('error', console.error); // If there is an error in connectivity
db.once('open', () => {
  insertCV();
}); // If the connections to the mongo DB was succeeded.

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
  cvModel.createCV({
    title: 'd',
    profile: 'd',
    workExp: 'd',
    education: 'd',
    active: 'd',
    languages: 'd',
    userEmail: 'D' // Candidate reference
  });
}
