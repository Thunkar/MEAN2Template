 var mail = require('nodemailer'),
    Promise = require('bluebird'),
    config = require('../services.js').config,
    winston = require('winston');
    
const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading email services");

var transporter = mail.createTransport({
    service: 'SendGrid',
    auth: {
        user: config.mailUser,
        pass: config.mailPass
    }
});

exports.generator = function (title, content) {
    var body = '<html><div id="container" style="width: 500px; background: rgb(20,20,22); border-radius: 10px; padding: 20px;"><head><div id="title"><img src="' + config.fileServer + 'banner" style="width:500px"/></div></head><body><div id="text" style="margin: 10px; background: rgb(20,20,22); padding-left: 15px; padding-right: 15px; padding-top: 3px; padding-bottom: 5px; border-radius: 5px;"><p style="color: white; font-family: \'Verdana\'; font-weight: 100; font-size: 14px; line-height: 60%;">' + title + '</p><div id="list" style="padding: 10px;">' + content + '</div><p style="color: white; font-family: \'Verdana\'; font-weight: 100; font-size: 14px;">Greetings,</p><p style=" color: white; font-family: \'Verdana\'; font-weight: 100; font-size: 14px;">The Kultur team</p></div><p style="color: white; font-family: \'Verdana\'; font-weight: 100; font-size: 10px; padding-top: 20px;">Copyright 2015 Kultur. Todos los derechos reservados.</p><body></div></html>';
    return body;
};

exports.sendMail = function(options) {
    return new Promise((resolve, reject) => {
        transponder.sendMail(options, (err, result) => {
            if(err) return reject(err);
            return resolve(result);
        });
    });
}

exports.init = function(){
    return new Promise((resolve, reject) => {
        return resolve();
    });
};