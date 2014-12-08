var mongojs = require('mongojs');
    bcrypt   = require('bcrypt'),
    SALT_WORK_FACTOR  = 10;

//first parameter is the name of the database, second is an array of collections
var db = mongojs('mydb', ['users']);

//push a new user to the database using mongojs
//obj comes in as : {username: username, password: password} and we add likes and dislikes arrays
var addUserToDatabase = function(obj, callback) {
	db.users.find({username: obj.username}, function(error, doc) {
		if(!doc.length) {

			//generate a salt
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
				if (err) {
					return next(err);
				}

				bcrypt.hash(user.password, salt, function(err, hash) {
					if (err) {
						return next(err);
					}
					obj.password = hash;
					obj.salt = salt;
					obj.likes = [];
					obj.dislikes = [];
					db.users.insert(obj);
					callback(obj);
				})
			})
		}
	})
};

//push to likes
//adds a restaurant to a user's likes array
var addRestaurantToLikes = function(username, restaurant) {
	db.users.update({
		username: username
	}, {
		$push: {
			'likes': restaurant
		}
	}, function() {
		//update complete
	});
};

//push to dislikes
//adds a restaurant to a user's dislikes array
var addRestaurantToDislikes = function(username, restaurant) {
	db.users.update({
		username: username
	}, {
		$push: {
			'dislikes': restaurant
		}
	}, function() {
		//update complete
	});
};

//get likes
//returns array of liked restaurants for a user
var getLikes = function(username, callback) {
	db.users.findOne({
		username: username
	}, function(err, doc) {
		//doc is the document that is found
		//doc.likes is the array of restaurant names liked by the user
		callback(doc.likes);
	});
};

//get likes
//returns array of disliked restaurants for a user
var getDislikes = function(username, callback) {
	db.users.findOne({
		username: username
	}, function(err, doc) {
		//doc is the document that is found
		//doc.dislikes is the array of restaurant names liked by the user
		callback(doc.dislikes);
	});
};


//checks if a given restaurant is already in a user's likes
var isInLikes = function(username, restaurant, callback) {
	var result = false;
	getLikes(username, function(likes){
		console.log(likes);
		for (var i = 0; i < likes.length; i++) {
			if (likes[i] === restaurant){
				result = true;
			}
		}
		callback(result);
	});
};

//checks if a given restaurant is already in a user's dislikes
var isInDislikes = function(username, restaurant, callback) {
	var result = false;
	getDislikes(username, function(dislikes){
		console.log(dislikes);
		for (var i = 0; i < dislikes.length; i++) {
			if (dislikes[i] === restaurant){
				result = true;
			}
		}
		callback(result);
	});
};
 
module.exports = {
	addUserToDatabase: addUserToDatabase,
	addRestaurantToLikes: addRestaurantToLikes,
	addRestaurantToDislikes: addRestaurantToDislikes,
	getLikes: getLikes,
	getDislikes: getDislikes,
	isInLikes: isInLikes,
	isInDislikes: isInDislikes
};

