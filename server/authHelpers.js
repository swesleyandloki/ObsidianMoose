var bcrypt   = require('bcrypt'),
    SALT_WORK_FACTOR  = 10;

var comparePasswords = function (candidatePassword, savedPassword, callback) {
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      console.log(error);
    } else {
      callback(isMatch);
    }
  });
};

module.exports = {
	comparePasswords: comparePasswords
};
