var winston = require('winston'),
    CodedError = require('../utils/CodedError.js');


var systemLogger = winston.loggers.get('system');


exports.resultSender = function(req, res, next) {
    if(req.result) return res.status(200).send(req.result);
    else return next(new CodedError("Not found", 404));
}

exports.genericErrorHandler = function(err, req, res, next){
    systemLogger.error(err.message);
    if (!err.code || isNaN(err.code) || err.code < 400) err.code = 500;
    return res.status(err.code).send(err.message);
}