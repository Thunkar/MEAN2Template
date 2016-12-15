var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    services = require("./utils/services.js"),
    winston = require('winston');

services.init().then(() => {

    var systemLogger = winston.loggers.get('system');

    services.fileUtils.ensureExists('./logs').then((err) => { if (err) systemLogger.error(err.message) });

    var users = require('./routes/users.js');

    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(services.session.store);

    if (services.config.logLevel == "debug") {
        app.use((req, res, next) => {
            var user = { username: "unknown" };
            if (req.session && req.session.user)
                var user = req.session.user;
            var logLine = "[" + user.username + "] " + req.originalUrl;
            systemLogger.debug(logLine);
            next();
        });
    }

    app.use("/api/users", users);

    app.use(express.static(__dirname + "/frontend/dist"));

    var resultController = require('./controllers/resultController.js');

    app.use(resultController.genericErrorHandler);

    app.listen(services.config.port, () => {
        systemLogger.info(services.config.serverName + " worker running");
    });
}, (err) => {
    console.error(err.message);
    process.exit(-1);
});
