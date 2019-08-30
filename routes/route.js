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
        "consumer_key": "Gl76oTZWvoSyTWG5v7GY1xfcR",
        "consumer_secret": "dVZdhTnj35MiyXAoGQkaofOYpotoMyOkLN6fURJAUDlnG90K9Z",
        "callback": "https://passport-authen.herokuapp.com/auth/twitter/callback"
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
router.get('/',
    function (req, res) {
        if (!req.user) {
            res.render('home', { user: req.user });
        } else {
            res.json(req.user);
        }
        // res.render('home', { user: req.user });
    });

router.get('/login',
    function (req, res) {
        res.render('login');
    });

router.get('/auth/facebook',
    passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

router.get('/profile/facebook',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.json(req.user);
        // res.render('profile', { user: req.user });
    });




//Twitter
const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumer_key,
    consumerSecret: config.twitter.consumer_secret,
    callbackURL: config.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router