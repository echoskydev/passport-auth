const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hi, Passport');
});


var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

ÎÎÎ
// Passport session setup.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '901760419844459',
    clientSecret: '7e9dc26782f560375256038ca1e0de7f',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        facebookId: profile.id
    }, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
}
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);





app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});