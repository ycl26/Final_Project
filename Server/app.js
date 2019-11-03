// Initialize the express framework
var express 	 	= require('express'),
	path 			= require('path'),
	mongoose		= require('mongoose'),
	bodyParser		= require('body-parser')

// Express setup 
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//DB Connectivity 
mongoose.connect('mongodb://localhost:27017/Assignment3');

	var db = mongoose.connection;
	db.on('error', console.error); // Log the error to the console when there is an error in connectivity?
	db.once('open', startServer); // Start the server on port '3000' upon successfull connectivity
	
	
	// Start up the server
	function startServer(){
		var server = app.listen(3000, function(){
			var port = server.address().port;
			console.log('Listening on port ' + port);
			console.log('Connection succeded');
		})
	}


// Routes set up
var router 	= express.Router();
var usersController = require('./controllers/api/users');

// Get all listings available to buy.
router.post('/api/login',usersController.onUserLogin); // End point is 'http/localhost:3000/api/buy'
router.post('/api/signup', usersController.onUserSignUp);
router.post('/api/forgotPSW', usersController.onForgotPassword);
// Register the routing
app.use('/', router);

