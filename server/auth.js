var authHelpers = require('./authHelpers.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple');
    mongojs = require('mongojs');
    dbHelpers = require('./databaseHelpers')

var db = mongojs('mydb', ['users']);

module.exports = {
  login: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
	var payload = {username: username};
    db.users.find({username: username}, function(err, doc) {
    	if (!doc.length) {
    		res.send('error');
    	} else {
    		authHelpers.comparePasswords(password, doc[0].password, function(isMatch) {
    			if (isMatch) {
    				var token = jwt.encode(payload, 'secret');
    				console.log('1234567')
    				res.json({
    					token: token,
    					username: username});
					res.end('success');
    			}
    		});
    	}	
    });
  },

  signup: function (req, res, next) {
    var username  = req.body.username,
        password  = req.body.password,
        create,
        newUser;

    // check to see if user already exists
    db.users.find({username: username}, function(err, doc) {
    	if (doc.length) {
    		console.log('user already exists');
    	} else {
    		newUser = {username: username, password: password};
    		dbHelpers.addUserToDatabase(newUser, function(user){
    			var token = jwt.encode(user, 'secret');
    			res.json({token: token}); 
    			res.end('success')});
    	}
    })
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      db.users.find({username: user.username}, function(err, doc) {
      	if (doc.length) {
      		res.send(200);
      	} else {
      		res.send(401);
      	}
      })
    }
  }
};
