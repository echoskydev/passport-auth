const express = require('express')
const router = express.Router()

var passportTwitter = require('../config/twitter');


// Define routes.
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



//Twitter
router.get('/auth/twitter',
    passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
        // res.json(req.user);
    });

module.exports = router