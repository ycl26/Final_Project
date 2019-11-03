
var users = require('../../models/users'); // Model object

// Wrap all the methods in an object
function doUserLogin (req, res){
    var email = req.body.email;
    var psw = req.body.psw;

    users.find({userEmail: email, password: psw}, function(err, data){
            if(err){
                res.status(500).send('There is server internal error');
            }else if(data.length < 1) {
                res.status(204).send('not found'); // Return all the data from DB
            }else{
                res.status(200).send({response:'logged in'}); // Return all the data from DB
            }
    })
}

function doForgotPassword(req,res){
    var email = req.body.email;

    users.find({userEmail: email}, function(err, data){
        if(err){
            res.status(500).send('There is server internal error');
        }else if(data.length < 1) {
            res.status(204).send('not found'); // Return all the data from DB
        }else{
            var user = data[0];
            res.status(200).send({psw: user.password}); // Return all the data from DB
        }
    })
}

function doUserSignUp(req, res, next) {
    console.log("Create hit");
    var user = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userEmail: req.body.email,
        password: req.body.psw,
    });

    user.save(function (err, data) {
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
    onUserSignUp: doUserSignUp
};
