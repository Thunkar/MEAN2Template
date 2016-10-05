const crypto = require("crypto"),
    async = require('async'),
    config = require('../utils/services.js').config,
    mongoose = require('mongoose'),
    User = mongoose.model('UserModel'),
    moment = require('moment'),
    CodedError = require('../utils/CodedError.js'),
    Promise = require('bluebird'),
    winston = require('winston');

const systemLogger = winston.loggers.get("system");
const sessionLogger = winston.loggers.get("session");

const pickFrom = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789=-+#%&";

function computeSHA256Hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function SHA256(data) {
    return new Promise((resolve, reject) => {
        let computeHashAsync = async.asyncify(computeSHA256Hash);
        computeHashAsync(data, (err, hash) => {
            if(err) return reject(err);
            return resolve(hash);
        });
    });
};

function generateRandomPassword() {
    let password = "";
    for (let i = 0; i < 8; i++) {
        password += pickFrom.charAt(Math.random() * 59);
    }
    return password;
};

function generateToken() {
    let token = "";
    for (let i = 0; i < 40; i++) {
        token += pickFrom.charAt(Math.random() * 59);
    }
    return token;
};

function generateSaltedPassword(password, iterations) {
    const salt = generateToken();
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password.toLowerCase(), salt, iterations, 256, 'sha256', (err, key) => {
            if (err) return reject(err);
            const hash = key.toString('hex');
            return resolve({ salt: salt, hash: hash, iterations: iterations });
        });
    });
};

function validateSaltedPassword(password, salt, hash, iterations) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password.toLowerCase(), salt, iterations, 256, 'sha256', (err, key) => {
            if (err) return reject(err);
            const calculatedHash = key.toString('hex');
            return resolve(calculatedHash === hash);
        });
    });
};

function auth(req, res, next) {
    if(!req.session.user) return next(new CodedError("Not authorized", 403));
    return next();
};



exports.SHA256 = SHA256;
exports.generateSaltedPassword = generateSaltedPassword;
exports.generateRandomPassword = generateRandomPassword;
exports.generateToken = generateToken;
exports.validateSaltedPassword = validateSaltedPassword;
exports.auth = auth;