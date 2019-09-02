const express = require('express');
const routes = require('./routes/route');
const routeFacebook = require('./routes/facebook.route');
const routeTwitter = require('./routes/twitter.route');
const routeInstagram = require('./routes/instagram.route');
const app = express();
const PORT = process.env.PORT || 5000


// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(require('./configuration/config'));
app.use('/', routeInstagram)


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});