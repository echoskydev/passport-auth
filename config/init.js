const passport = require('passport');

module.exports = function () {
    // Initialize Passport and restore authentication state, if any, from the
    // session.
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });

}