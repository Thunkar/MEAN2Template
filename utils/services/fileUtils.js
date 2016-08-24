const mkdirp = require('mkdirp'),
    fs = require('fs'),
    Promise = require('bluebird'),
    async = require('async'),
    rimraf = require('rimraf'),
    winston = require('winston');

const servicesLogger = winston.loggers.get('services');

servicesLogger.info("Loading file utils");

exports.ensureExists = function (path) {
    return new Promise(function (resolve, reject) {
        mkdirp(path, function (err) {
            if (err) {
                if (err.code == 'EEXIST') return resolve(null);
                else return reject(err);
            } else return resolve(null);
        });
    });
};

exports.moveFile = function (originalPath, newPath) {
    return new Promise(function (resolve, reject) {
        var readStream = fs.createReadStream(originalPath);
        var writeStream = fs.createWriteStream(newPath);
        readStream.on('error', reject);
        writeStream.on('error', reject);
        readStream.on('close', function () {
            fs.unlink(originalPath, resolve);
        });
        readStream.pipe(writeStream);
    });
};

exports.listFiles = function (path) {
    return new Promise(function (resolve, reject) {
        exports.ensureExists(path).then(function () {
            fs.readdir(path, function (err, files) {
                if (err) return reject(err);
                else return resolve(files);
            });
        }, function (err) {
            return reject(err);
        });
    });
};

exports.deleteFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.unlink(path, function (err) {
            if (err) return reject(err);
            else return resolve();
        });
    });
};

exports.rmdirAsync = function (path) {
    return new Promise(function (resolve, reject) {
        rimraf(path, function (err) {
            if (err) return reject(err);
            else return resolve();
        })
    })
}

exports.writeFile = function (data, path) {
    return new Promise(function (resolve, reject) {
        exports.ensureExists(path).then(function () {
            fs.writeFile(data, path, function (err) {
                if (err) return reject(err);
                else return resolve();
            })
        }, function (err) {
            if (err) return reject(err);
        });
    })
}

exports.init = function () {
    return exports.ensureExists('./logs')
}