const express = require('express');
const passport = require('passport');
const routes = require('./routes/route');
const app = express();
const PORT = process.env.PORT || 5000


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(require('./config/config'));
app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});