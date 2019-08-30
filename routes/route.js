const express = require('express')
const passport = require('passport');
// const { blogpost } = require('../controllers')

const router = express.Router()

//Facebook
const FacebookController = require('../controllers/facebook.controller');
const Facebook = new FacebookController();
router.get('/v1/auth/facebook',
    passport.authenticate('facebook'));
router.get('/v1/callback/facebook',
    passport.authenticate('facebook', { failureRedirect: '/v1/auth/facebook' }),
    function (req, res) {
        res.redirect('/');
    }
);
router.get('/v1/profile/facebook',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('profile', { user: req.user });
    });

// router.get('/v1/auth/facebook', (req, res) => res.sendAsyncApi(Facebook.authenticate()));
// router.get('/v1/callback/facebook', (req, res) => res.sendAsyncApi(Facebook.callback()));

module.exports = router