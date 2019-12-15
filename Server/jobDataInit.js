require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// step 1 : Inject the mongoose module and establish connection
const mongoose = require('mongoose'),
  dbname = 'FinalProject';
const jobModel = require('./models/job'); // Model object

mongoose.connect('mongodb://localhost:27017/' + dbname);
const db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on('error', console.error); // If there is an error in connectivity
db.once('open', () => {
 insertJob();
}); // If the connections to the mongo DB was succeeded.

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
