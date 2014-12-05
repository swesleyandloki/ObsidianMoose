var db = require('./databaseHelpers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//on sign up post request
	//if username already exists
		//send error
	//if not, create a new entry in the database Users collection

//on login post request
	//if username and password are correct
		//log user in
	//else error (server or username/password error)



app.get('/loginFailure', function(req, res, next){
	res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next){
	res.send('Successfully authenticated');
});




passport.use(new LocalStrategy(
	function(username, password, done){
		db.users.findOne({username: username}, function(err, user){
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, {message: 'Incorrect username.'});
			}
			if (!user.validPassword(password)){
				return done(null, false, {message: 'Incorrect password.'})
			}
			return done(null, user);
		})
	}
));

//stores user information in the session
//serializeUser takes a user object and stores any information you want in the session, when you return done(null, user)
passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id)
    done(null, user._id);
});

//deserializeUser takes the information stored in the session (sent by cookieSession in every request) 
//and checks if the session is still valid for a user, 
//if(!err) done(null,user) is true, keeps the user in the session, 
//where else done(err,null) removes it from the session, 
//redirecting you to whatever your app.get('/auth/:provider/callback') sends the user to after checking if the 
//session is timed out or not. This should clarify things for your second question.

passport.deserializeUser(function(id, done) {
    db.users.findById(id, function(err, user){
        console.log(user)
        if(!err) done(null, user);
        else done(err, null)  
    })
});

module.exports = passport;