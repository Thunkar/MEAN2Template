const fs = require('fs'),
    Promise = require('bluebird'),
    async = require('async'),
    winston = require('winston');

var servicesLogger;

var services = {};

function init() {
    return new Promise((resolve, reject) => {
        try {
            var config = JSON.parse(fs.readFileSync('./config.cnf', 'utf8').toString());
        } catch (err) {
            console.error("No config");
            process.exit(-1);
        }
        services.config = config;
        require('./services/logger.js');
        servicesLogger = winston.loggers.get('services');
        servicesLogger.info("Loading services");
        var files = fs.readdirSync("./utils/services").filter((file) => {
            return file.indexOf(".js") != -1 && file != "logger.js";
        }).sort((a, b) => {
            return b == "dbLoader.js" ? 1 : -1;
        });
        async.eachSeries(files, (file, callback) => {
            var service = require("./services/" + file);
            services[file.replace('.js', '')] = service;
            service.init().then(callback);
        }, (err) => {
            if(err) return reject(err);
            servicesLogger.info("Service loading completed");
            return resolve();
        });
    }, (err) => {
        return reject(err);
    });
}

services.init = init;

module.exports = services;
