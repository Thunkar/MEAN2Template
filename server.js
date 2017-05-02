var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    services = require("./utils/services.js"),
    winston = require('winston');

services.init().then(() => {

    var systemLogger = winston.loggers.get('system'),
        config = services.config;

    services.fileUtils.ensureExists('./logs').then((err) => { if (err) systemLogger.error(err.message) });

    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(services.session.store);

    if (services.config.logLevel == "debug") {
        app.use((req, res, next) => {
            var user = { alias: "unknown" };
            if (req.session && req.session.user)
                var user = req.session.user;
            var logLine = "[" + user.alias + "] " + req.originalUrl;
            systemLogger.debug(logLine);
            next();
        });
    }

    services.fileUtils.listFiles('./routes').then((routes) => {
        routes.forEach((route) => {
            app.use(config.mountPoint + '/api/' + route.replace('.js', ''), require('./routes/' + route));
        });
    });

    app.use(config.mountPoint + '/', express.static(__dirname + '/frontendDist'));

    app.get(config.mountPoint + '/files/*', (req, res, next) => {
        var location = path.resolve(config.uploadedBase + req.url.replace('files/', ''));
        services.fileUtils.access(location).then(() => {
            return res.sendFile(location);
        }, (err) => {
            return next(new CodedError("Not found", 404));
        });
    });

    var resultController = require('./controllers/resultController.js');

    app.use(resultController.genericErrorHandler);

    app.listen(services.config.port, () => {
        systemLogger.info(services.config.serverName + " worker running");
    });
}, (err) => {
    console.error(err.message);
    process.exit(-1);
});
