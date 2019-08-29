const express = require('express')
    , passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , session = require('express-session')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , config = require('./configuration/config')
    , app = express();

const PORT = process.env.PORT || 5000

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret: config.facebook_api_secret,
    callbackURL: config.callback_url
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        facebookId: profile.id
    }, function (err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
}
));





app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index', { user: req.user });
    // res.send('Hi, Passport');
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function (req, res) {
        res.redirect('/');
    });
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});