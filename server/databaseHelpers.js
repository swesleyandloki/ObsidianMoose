var mongojs = require('mongojs');

//first parameter is the name of the database, second is an array of collections
var db = mongojs('mydb', ['users']);

//push a new user to the database using mongojs
//obj comes in as : {username: username, password: password} and we add likes and dislikes arrays
var addUserToDatabase = function(obj) {
	obj.likes = [];
	obj.dislikes = [];
	db.users.save(obj);
};

//push to likes
//adds a restaurant to a user's likes array
var addRestaurantToLikes = function(username, restaurantName) {
	db.users.update({
		username: username
	}, {
		$push: {
			'likes': restaurantName
		}
	}, function() {
		//update complete
	});
};

//push to dislikes
//adds a restaurant to a user's dislikes array
var addRestaurantToDislikes = function(username, restaurantName) {
	db.users.update({
		username: username
	}, {
		$push: {
			'dislikes': restaurantName
		}
	}, function() {
		//update complete
	});
};

//get likes
//returns array of liked restaurants for a user
var getLikes = function(username) {
	db.users.findOne({
		username: username
	}, function(err, doc) {
		//doc is the document that is found
		//doc.likes is the array of restaurant names liked by the user
		return doc.likes
	});
};

//get likes
//returns array of disliked restaurants for a user
var getDislikes = function(username) {
	db.users.findOne({
		username: username
	}, function(err, doc) {
		//doc is the document that is found
		//doc.likes is the array of restaurant names liked by the user
		return doc.dislikes
	});
};


//checks if a given restaurant is already in a user's likes
var isInLikes = function(username, restaurant) {
	var result = false;
	var likes = getLikes(username);
	for (var i = 0; i < likes.length; i++) {
		if (likes[i] === restaurant){
			result = true;
		}
	}
	return result;
};

//checks if a given restaurant is already in a user's dislikes
var isInDislikes = function(username, restaurant) {
	var result = false;
	var dislikes = getDislikes(username);
	for (var i = 0; i < dislikes.length; i++) {
		if (dislikes[i] === restaurant){
			result = true;
		}
	}
	return result;
};
 
module.exports = {
	addUserToDatabase: addUserToDatabase,
	addRestaurantToLikes: addRestaurantToLikes,
	addRestaurantToDislikes: addRestaurantToDislikes,
	getLikes: getLikes,
	getDislikes: getDislikes
};

