var mongoose = require('mongoose');

module.exports = mongoose.model('Candidate', {
    firstName: String,
    lastName: String,
    userEmail: String,  
    password: String
});
