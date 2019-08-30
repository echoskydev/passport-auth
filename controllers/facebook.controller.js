
const config = require('../configuration/facebook');
const passport = require('passport');

class FacebookController {
    authenticate() {
        return new Promise((resolve, reject) => {
            console.log('hi');
            passport.authenticate('facebook');
        });
    }

    callback() {
        return new Promise((resolve, reject) => {
            passport.authenticate('facebook', { failureRedirect: '/login' }),
                function (req, res) {
                    res ? resolve(res) : reject(err);
                }
        });
    }


}
module.exports = FacebookController;