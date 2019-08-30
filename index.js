const express = require('express');
const routes = require('./routes/route')
const app = express();
const PORT = process.env.PORT || 5000

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.get('/',
//     function (req, res) {
//         res.json({ "foo": "bar" });
//         // res.render('home', { user: req.user });
//     }
// );
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


app.use(require('./configuration/config'));
app.use('/', routes)


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});