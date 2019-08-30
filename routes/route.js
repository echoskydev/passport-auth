const express = require('express')
const passportFacebook = require('passport');
const Strategy = require('passport-facebook').Strategy;

const config = {
    "cookieSecret": "seedsoft",
    "facebook": {
        "app_id": "901760419844459",
        "app_secret": "7e9dc26782f560375256038ca1e0de7f",
        "callback": "https://passport-authen.herokuapp.com/api/v1/callback/facebook"
    },
    "twitter": {
        "consumer_key": "akeyishere",
        "consumer_secret": "mysecretisbetterthanyoursecret",
        "callback": "http://localhost:3000/auth/twitter/callback"
    }
}

const FacebookStrategy = new Strategy({
    clientID: config.facebook.app_id,
    clientSecret: config.facebook.app_secret,
    callbackURL: config.facebook.callback
}, function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
});

passportFacebook.use(FacebookStrategy);

const router = express.Router()

//Facebook
// const FacebookController = require('../controllers/facebook.controller');
// const Facebook = new FacebookController();
router.get('/v1/auth/facebook',
    passportFacebook.authenticate('facebook'));
router.get('/v1/callback/facebook',
    passportFacebook.authenticate('facebook', { failureRedirect: '/v1/auth/facebook' }),
    function (req, res) {
        console.log(res);
    }
);
router.get('/v1/profile/facebook',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        console.log(user);
    });

// router.get('/v1/auth/facebook', (req, res) => res.sendAsyncApi(Facebook.authenticate()));
// router.get('/v1/callback/facebook', (req, res) => res.sendAsyncApi(Facebook.callback()));

module.exports = router