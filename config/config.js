
module.exports = function (req, res, next) {

    // Send data json & status
    res.sendApi = function (data, status = 200) {
        res.setHeader('content-type', 'application/json');
        res.status(status);
        res.json(data);
    }

    /**
     * Send data response
     * @param {Promise} promise
     */
    res.sendAsyncApi = function (promise) {
        promise
            .then(item => res.sendApi(item))
            .catch(error => res.sendApi(error, 400));
    }

    next();
}