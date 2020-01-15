require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';
const companyModel = require('./models/company'); // Model object

mongoose.connect('mongodb://localhost:27017/' + dbname);
const db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on('error', console.error); // If there is an error in connectivity
db.once('open', () => {

  insertCompanies();
}); // If the connections to the mongo DB was succeeded.

function insertCompanies() {
  companyModel.createCompany({
    companyName: 'A',
    userEmail: 'A',
    password: 'A',
    address: 'A',
  });
  companyModel.createCompany({
    companyName: 'B',
    userEmail: 'B',
    password: 'B',
    address: 'B',
  });
  companyModel.createCompany({
    companyName: 'C',
    userEmail: 'C',
    password: 'C',
    address: 'C',
  });
}
