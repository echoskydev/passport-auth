const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const configAuth = require('./auth');
const init = require('./init');

passport.use(new InstagramStrategy({
    clientID: configAuth.facebook.app_id,
    clientSecret: configAuth.facebook.app_secret,
    callbackURL: configAuth.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

// serialize user into the session
init();

module.exports = passport;