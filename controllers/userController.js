const services = require("../utils/services.js"),
    config = services.config,
    mongoose = require('mongoose'),
    User = mongoose.model('UserModel'),
    CodedError = require('../utils/CodedError.js'),
    winston = require('winston');

const systemLogger = winston.loggers.get('system');


exports.getUser = function (req, res, next) {
    User.findById(req.params.user, { _id: 1, alias: 1, fb: 1}).exec().then((user) => {
        if(req.session.user._id == user._id) {
            req.session._garbate = new Date();
            req.session.touch();
        }
        return res.status(200).jsonp(user);
    }, (err) => {
        return next(err);
    });
}

exports.getUsers = function(req, res, next) {
    User.find({}, { _id: 1, alias: 1, fb: 1}).exec().then((users) => {
        return res.status(200).jsonp(users);
    }, (err) => {
        return next(err);
    })
}