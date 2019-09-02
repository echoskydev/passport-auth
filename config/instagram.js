const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const configAuth = require('./auth');
const init = require('./init');

passport.use(new InstagramStrategy({
    clientID: configAuth.instagram.app_id,
    clientSecret: configAuth.instagram.app_secret,
    callbackURL: configAuth.instagram.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

// serialize user into the session
init();

module.exports = passport;