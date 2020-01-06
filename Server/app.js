// Initialize the express framework
const express 	 	= require('express'),
	path 			= require('path'),
	mongoose		= require('mongoose'),
	bodyParser		= require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors');
    
// Express setup 
const app = express();
app.use(cors({credentials: true, origin: true}));
// app.use(customCorsMiddleware("http://localhost:4200"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//DB Connectivity 
mongoose.connect('mongodb://localhost:27017/FinalProject');

	const db = mongoose.connection;
	db.on('error', console.error); // Log the error to the console when there is an error in connectivity?
	db.once('open', startServer); // Start the server on port '30nal00' upon successfull connectivity
	
	
	// Start up the server
	function startServer(){
		const server = app.listen(3000, function(){
			const port = server.address().port;
			console.log('Listening on port ' + port);
			console.log('Connection succeded');
		})
	}


// Routes set up
const router 	= express.Router();
const usersController = require('./controllers/api/users');
import * as cvController from './controllers/api/CVs';
import * as candidateController from './controllers/api/candidate';

// Get all listings available.
router.post('/api/login',usersController.onUserLogin); 
router.post('/api/logout',usersController.onUserLogout);
router.get('/api/userinfo',usersController.onUserinfo);
router.post('/api/signupCandidate', usersController.onCandidateSignUp);
router.post('/api/signupCompany', usersController.onCompanySignUp);
router.post('/api/forgotPSW', usersController.onForgotPassword);
router.get('/api/userinfo',usersController.onUserinfo);

router.post('/api/cv/upsert', cvController.upsertCV);
router.post('/api/cv/remove', cvController.removeCV);
router.get('/api/cv/findbytitle', cvController.findByTitle);
router.get('/api/candidate/cvs', candidateController.getCVs);

router.post('/api/job/upsert', jobController.upsertJob);
router.post('/api/job/remove', jobController.removeJob);
router.get('/api/job/findbytitle', jobController.findByTitle);
router.get('/api/company/jobs', companyController.getJobs);

// Register the routing
app.use('/', router);