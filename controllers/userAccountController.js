const services = require("../utils/services.js"),
    config = services.config,
    mongoose = require('mongoose'),
    User = mongoose.model('UserModel'),
    authController = require('./authController.js'),
    moment = require('moment'),
    CodedError = require('../utils/CodedError.js'),
    slug = require('slug'),
    winston = require('winston');

const systemLogger = winston.loggers.get('system');

function mapBasicUser(user) {
    return {
        _id: user.id,
        alias: user.alias,
        fb: user.fb
    }
}

exports.checkEmail = function (req, res, next) {
    if (!req.query.email || req.query.email == "" || req.query.email.indexOf(" ") != -1 || req.query.email.indexOf("@") == -1) return next(new CodedError("Invalid email", 400));
    User.findOne({ email: req.query.email }).exec().then((user) => {
        if (user) return next(new CodedError("Duplicated email", 403));
        return res.status(200).send("Ok");
    }, (err) => {
        return next(err);
    });
};

exports.checkAlias = function (req, res, next) {
    var slug = slug(req.query.alias);
    if (!slug) return next(new CodedError("Invalid alias", 400));
    User.findOne({ $or: [{ slug: slug }, { alias: req.query.alias }] }).exec().then((user) => {
        if (user) return next(new CodedError("Duplicated alias", 403));
        return res.status(200).send("Ok");
    }, (err) => {
        return next(err);
    });
};

exports.regUser = function (req, res, next) {
    const email = req.body.email.trim();
    if (!email || email == "" || email.indexOf(" ") != -1 || email.indexOf("@") == -1) return next(new CodedError("Invalid email", 400));
    var user;
    authController.generateSaltedPassword(req.body.password.toLowerCase(), config.pwdIterations).then((saltedPassword) => {
        user = new User({
            alias: req.body.alias,
            slug: slug(req.body.alias),
            email: email,
            name: name,
            pwd: saltedPassword,
            hasPassword: true,
        });
        return user.save();
    }).then(() => {
        var userToSend = mapBasicUser(user);
        req.session.user = userToSend;
        return res.status(200).send(userToSend);
    }, (err) => {
        return next(err);
    });
};

exports.login = function (req, res, next) {
    var user;
    User.findOne({ alias: req.body.alias.toLowerCase() }).then((storedUser) => {
        user = storedUser;
        if (!user) return res.status(404).send("Not found");
        return authController.validateSaltedPassword(req.body.password, user.pwd.salt, user.pwd.hash, user.pwd.iterations);
    }).then((result) => {
        if (!result) return next(new CodedError("Not authorized", 403));
        var userToSend = mapBasicUser(user);
        req.session.user = userToSend;
        return res.status(200).jsonp(result);
    }, (err) => {
        return next(err);
    });
};

exports.FBRegister = function (req, res, next) {
    if (!req.body.fb) return next(new CodedError("Bad request", 400));
    var user;
    User.find({ 'fb.id': req.body.fb.id }).exec().then((users) => {
        if (users.length != 0) return next(new CodedError("Already registered", 400));
        return services.facebook.checkAccessToken(req.body.fb.accessToken, req.body.fb.id);
    }).then((isTokenValid) => {
        if (!isTokenValid) return next(new CodedError("Not authorized", 403));
        user = new User({
            alias: req.body.alias,
            slug: slug(req.body.alias),
            fb: req.body.fb,
            mergedWithFB: true,
            hasPassword: false,
            name: req.body.fb.name
        });
        return user.save();
    }).then((user) => {
        return res.status(200).jsonp(mapBasicUser(user));
    }, (err) => {
        return next(err);
    });
};

exports.FBLogin = function (req, res, next) {
    var user;
    User.findOne({ 'fb.id': req.body.fb.id }).exec().then((storedUser) => {
        user = storedUser;
        if (!user) return next(new CodedError("Not found", 404));
        if (!user.mergedWithFB) return next(new CodedError("Not merged", 400));
        return services.facebook.checkAccessToken(req.body.fb.accessToken, req.body.fb.id);
    }).then((isTokenValid) => {
        if (!isTokenValid) return next(new CodedError("Not authorized", 403));
        var userToSend = mapBasicUser(user);
        req.session.user = userToSend;
        return res.status(200).jsonp(userToSend);
    }, (err) => {
        return next(err);
    });
};

exports.FBMerge = function (req, res, next) {
    var user = req.user;
    if (!user) return next(new CodedError("Not found", 404));
    if (user.mergedWithFB) return next(new CodedError("Already merged", 400));
    if (!req.body.fb) return next(new CodedError("Bad request", 400));
    User.find({ 'fb.id': req.body.fb.id }).exec().then((users) => {
        if (users.length != 0) return next(new CodedError("Already merged", 400));
        return authController.validateSaltedPassword(req.body.password.toLowerCase(), user.pwd.salt, user.pwd.hash, user.pwd.iterations);
    }).then((result) => {
        if (!result) return next(new CodedError("Not authorized", 403));
        return services.facebook.checkAccessToken(req.body.fb.accessToken, req.body.fb.id);
    }).then((isTokenValid) => {
        if (err || !isTokenValid) return res.status(403).send("Not authorized");
        user.fb = req.body.fb;
        user.name = user.fb.name;
        user.mergedWithFB = true;
        user.hasPassword = true;
        return user.save();
    }).then((err) => {
        return res.status(200).send("Success");
    }, function (err) {
        return next(err);
    });
};

exports.FBUnMerge = function (req, res, next) {
    var user = req.user;
    if (!user) return next(new CodedError("Not found", 404));
    if (!user.pwd || !user.mergedWithFB) return next(new CodedError("Not merged", 400));
    if (!req.body.fb) return next(new CodedError("Bad request", 400));
    if (req.body.fb.id != user.fb.id) return next(new CodedError("Bad request", 400));
    authController.validateSaltedPassword(req.body.password, user.pwd.salt, user.pwd.hash, user.pwd.iterations).then((result) => {
        if (!result) return next(new CodedError("Not authorized", 403));
        return services.facebook.checkAccessToken(req.body.fb.accessToken, req.body.fb.id);
    }).then((isTokenValid) => {
        if (!isTokenValid) return next(new CodedError("Not authorized", 403));
        user.fb = undefined;
        user.mergedWithFB = false;
        user.hasPassword = true;
        user.save();
    }).then(() => {
        return res.status(200).send("Success");
    }, function (err) {
        return next(err);
    });
};

exports.updateProfile = function (req, res, next) {
    let user = req.user;
    user.name = req.body.name;
    user.email = req.body.email;
    if (!user.name || user.name == "") user.name = user.alias;
    if (!user.mergedWithFB && (!user.email || user.email == "")) return next(new CodedError("Not valid user", 400));
    user.save().then(() => {
        return res.status(200).send("Profile updated");
    }, (err) => {
        return next(err);
    });
};

exports.changePassword = function (req, res, next) {
    var user = req.user;
    if (user.hasPassword && !req.body.oldPassword) return next(new CodedError("No old password", 403));
    authController.validateSaltedPassword(req.body.oldPassword, user.pwd.salt, user.pwd.hash, user.pwd.iterations).then((result) => {
        if (!result) return next(new CodedError("Bad old password", 403));
        if (!req.body.password || req.body.password == "") return next(new CodedError("Bad new password", 400));
        return authController.generateSaltedPassword(req.body.password, config.pwdIterations);
    }).then((saltedPassword) => {
        user.pwd = saltedPassword;
        user.hasPassword = true;
        return user.save();
    }).then(() => {
        return res.status(200).send("Password updated");
    }, (err) => {
        return next(err);
    });
};

exports.restoreUserPassword = function (req, res) {
    var user;
    User.findOne({ alias: req.body.alias.toLowerCase() }).exec().then((storedUser) => {
        user = storedUser;
        if (!user) return next(new CodedError("Not found", 404));
        if (user.email != req.body.email) return next(new CodedError("Not valid email", 400));
        var newPassword = authController.generatePassword();
        return authController.SHA256(newPassword);
    }).then((hash) => {
        return authController.generateSaltedPassword(hash, config.pwdIterations);
    }).then((saltedPassword) => {
        user.pwd = saltedPassword;
        return user.save();
    }).then(() => {
        var body = '<p style="color: white; font-family: \'Verdana\'; font-weight: 100; font-size: 12px; margin-left: 20px; line-height: 60%;">' + newPassword + "</p>";
        var mailOptions = {
            from: 'Another Coffee For Me <noreply@anothercoffeefor.me>',
            to: user.email,
            subject: 'Password recovery',
            html: services.email.generator('New password for ' + user.alias + ' is:', body)
        };
        return services.email.sendMail(mailOptions);
    }).then((info) => {
        systemLogger.info("Message sent: " + info.response);
        return res.status(200).send("Success");
    }, (err) => {
        return next(err);
    });
};