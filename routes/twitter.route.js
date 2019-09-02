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





const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: config.twitter.app_id,
    consumerSecret: config.twitter.app_secret,
    callbackURL: config.twitter.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));



// Define routes.
router.get('/auth/twitter',
    passport.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    }
);


router.get('/',
    function (req, res) {
        if (!req.user) {
            res.render('home', { user: req.user });
        } else {
            res.json(req.user);
        }
    });

router.get('/login',
    function (req, res) {
        res.render('login');
    });

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.json(req.user);
        // res.render('profile', { user: req.user });
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



module.exports = router