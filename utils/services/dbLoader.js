var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const winston = require('winston'),
    fs = require('fs'),
    Promise = require('bluebird'),
    config = require('../services.js').config;

const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading DB models");

exports.init = function () {
    return new Promise((resolve, reject) => {

        fs.readdirSync("./utils/services/dbModels").filter(function (file) {
            return (file.indexOf(".") !== 0);
        }).forEach(function (file) {
            require("./dbModels/" + file);
        });

        const options = {
            user: config.dbUser,
            pass: config.dbPass,
            replset: function () {
                if (config.rsName)
                    return { rs_name: config.rsName }
                else return undefined;
            } (),
            server: function () {
                if (config.rsName)
                    return { poolSize: config.dbPoolSize }
                else return undefined;
            } ()
        }

        if (config.rsName)
            options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };

        mongoose.connect(config.dbAddress, options, (err) => {
            if (err) return reject(err);
            exports.connection = mongoose.connection;
            return resolve();
        })
    });
};