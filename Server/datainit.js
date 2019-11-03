
// step 1 : Inject the mongoose module and establish connection
var mongoose = require('mongoose'),
	dbname = "Assignment3";

mongoose.connect("mongodb://localhost:27017/" + dbname);
var db = mongoose.connection;

// step 2 : Wait for the connection response, 
db.on("error", console.error); // If there is an error in connectivity
db.once("open", insertProducts); // If the connections to the mongo DB was succeeded. 

// step 3: Create the model with blueprint of the data to be stored in the DB

// Here 'Property' is the collection (table) name 
var Product = mongoose.model("Property", {
		
    UsertFirstName: String,
    UserLastName: String,
    UserEmail: String,  
    Password: String
}

});

/*function deleteProducts(){
	Product.remove({}, function(err){
		if(err) console.log(err);
		insertProducts();
	});
	
}*/

function insertProducts(){

	var products = new Product({
		UsertFirstName: "Yulien",
		UserLastName: "Cabrera",
		UserEmail: "yulienc@myproject.com",  
		Password: "yulien"
	});	

	// To store the data using model object
	products.save(function(err){
		console.log("Data storeed into the Mongo DB");
		if(err) console.log(err);
	});

}