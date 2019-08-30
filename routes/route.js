const express = require('express')
const passportFacebook = require('passport');
const Strategy = require('passport-facebook').Strategy;

const config = {
    "cookieSecret": "seedsoft",
    "facebook": {
        "app_id": "901760419844459",
        "app_secret": "7e9dc26782f560375256038ca1e0de7f",
        "callback": "https://passport-authen.herokurouter.com/api/v1/callback/facebook"
    },
    "twitter": {
        "consumer_key": "akeyishere",
        "consumer_secret": "mysecretisbetterthanyoursecret",
        "callback": "http://localhost:3000/auth/twitter/callback"
    }
}

passportFacebook.use(new Strategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: config.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
}));

passportFacebook.serializeUser(function (user, cb) {
    cb(null, user);
});

passportFacebook.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


const router = express.Router()

// Initialize Passport and restore authentication state, if any, from the
// session.
router.use(passportFacebook.initialize());
router.use(passportFacebook.session());



//Facebook
// Define routes.
router.get('/v1/login',
    function (req, res) {
        res.render('login');
    });

router.get('/v1/auth/facebook',
    passportFacebook.authenticate('facebook'));

router.get('/v1/callback/facebook',
    passportFacebook.authenticate('facebook', { failureRedirect: '/v1/login' }),
    function (req, res) {
        res.redirect('/');
    }
);

router.get('/v1/profile/facebook',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
    });

module.exports = router