const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  console.log('trying to find user...'+ username);
  // check to see if the username exists
  models.User.findOne({
    where: {
      username: username
    }
  })
  .then((user) => {
    console.log(user);
    if (!user) {
      console.log('User not found');
      return done(null, false);
    }
    console.log("PASSWORD: " + password);
    let comparePassword = !authHelpers.comparePass(password, user.dataValues.password);
    if (comparePassword) {
      console.log('passwords do not match');
      return done(null, false);
    } else {
      return done(null, user.dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));


module.exports = passport;


