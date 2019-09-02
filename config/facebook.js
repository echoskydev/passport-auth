const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./auth');
const init = require('./init');

passport.use(new FacebookStrategy({
    clientID: configAuth.facebook.app_id,
    clientSecret: configAuth.facebook.app_secret,
    callbackURL: configAuth.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

// serialize user into the session
init();

module.exports = passport;