const express = require('express')
const router = express.Router()
const passport = require('passport');

const config = {
    "cookieSecret": "seedsoft",
    "facebook": {
        "app_id": "901760419844459",
        "app_secret": "7e9dc26782f560375256038ca1e0de7f",
        "callback": "https://passport-authen.herokuapp.com/auth/facebook/callback"
    },
    "twitter": {
        "app_id": "Gl76oTZWvoSyTWG5v7GY1xfcR",
        "app_secret": "dVZdhTnj35MiyXAoGQkaofOYpotoMyOkLN6fURJAUDlnG90K9Z",
        "callback": "https://passport-authen.herokuapp.com/auth/twitter/callback"
    },
    "instagram": {
        "app_id": "f42873813bff49b48a271d1296207bad",
        "app_secret": "0ed73b80c77b43e793a0dc99cb49ff86",
        "callback": "https://passport-authen.herokuapp.com/auth/instagram/callback"
    }
}




// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});




const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: config.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

//Facebook
// Define routes.


router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

module.exports = router