var request = require('request'),
    config = require('../services.js').config,
    Promise = require('bluebird'),
    winston = require('winston');

const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading FB services");

exports.checkAccessToken = function(token, userId) {
    return new Promise(function (resolve, reject) {
        request.get('https://graph.facebook.com/debug_token', {
            qs: {
                'input_token': token,
                'access_token': config.fbAppId + '|' + config.fbAppSecret
            }
        },
            function (err, resp, body) {
                body = JSON.parse(body);
                if(err) return reject(err);
                return resolve(!body.error && body.data.is_valid && body.data.user_id == userId);
            });
    });
};

exports.init = function(){
    return new Promise((resolve, reject) => {
        return resolve();
    });
};
