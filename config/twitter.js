const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const configAuth = require('./auth');
const init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitter.app_id,
    consumerSecret: configAuth.twitter.app_secret,
    callbackURL: configAuth.twitter.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

// serialize user into the session
init();

module.exports = passport;