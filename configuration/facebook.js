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
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.]
    // let data = profile._json;
    return cb(null, profile);
});

passportFacebook.use(FacebookStrategy);

module.exports = passportFacebook;