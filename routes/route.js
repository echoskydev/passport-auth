const express = require('express')
const router = express.Router()

const passportTwitter = require('../config/twitter');
const passportFacebook = require('../config/facebook');

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
    passportFacebook.authenticate('twitter'));

router.get('/auth/twitter/callback',
    passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
        // res.json(req.user);
    });


//Facebook
router.get('/auth/facebook',
    passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
        // res.json(req.user);
    });

module.exports = router