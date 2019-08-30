const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan')('combined');
const cookieParser = require('cookie-parser')();
const expressSession = require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true });
const routes = require('./routes/route')
const app = express();
const PORT = process.env.PORT || 5000

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/',
    function (req, res) {
        res.json({ "foo": "bar" });
        // res.render('home', { user: req.user });
    });

/**
 * lib body-parser
 * - parse application/x-www-form-urlencoded
 * - parse application/json
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan);
app.use(cookieParser);
app.use(expressSession);

app.use(require('./configuration/config'));
app.use('/api/', routes)
app.use(passport.initialize());

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});