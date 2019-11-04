var mongoose = require('mongoose');


module.exports = mongoose.model('Company', {
    companyName: String,
    userEmail: String,  
    password: String
});