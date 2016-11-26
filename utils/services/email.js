 var mail = require('nodemailer'),
    fs = require('fs'),
    Promise = require('bluebird'),
    config = require('../services.js').config,
    winston = require('winston');
    
const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading email services");

var transporter = mail.createTransport('smtps://'+ config.mailUser.replace('@gmail.com', '%40gmail.com:') + config.mailPass +'@smtp.gmail.com');

exports.generator = function (title, content) {
    var body = fs.readFileSync(config.uploadedBase + '/mail/template.html').toString();
    body = body.replace('$title', title);
    body = body.replace('$content', content);
    body = body.replace(/\$fileServer/g, config.fileServer + '/files/mail');
    return body;
};

exports.sendMail = function(options) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, result) => {
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