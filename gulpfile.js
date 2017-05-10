const gulp = require('gulp'),
  exec = require('child_process').exec,
  mkdirp = require('mkdirp'),
  del = require('del'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  fs = require('fs'),
  gulpTypings = require("gulp-typings"),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  systemjsBuilder = require('gulp-systemjs-builder'),
  argv = require('yargs').argv,
  less = require('gulp-less'),
  slug = require('slug'),
  fileUtils = require('./utils/services/fileUtils.js'),
  tscConfig = require('./tsconfig.json');

mongoose.Promise = Promise;


function ensureExists(path) {
  return new Promise(function (resolve, reject) {
    mkdirp(path, function (err) {
      if (err) {
        if (err.code == 'EEXIST') return resolve(null);
        else return reject(err);
      } else return resolve(null);
    });
  });
};

gulp.task('config:example', (done) => {
  var example = {
    "serverName": "Test",
    "fileServer": "http://localhost",
    "mountPoint": "",
    "port": 3000,
    "uploadedBase": "./uploaded",
    "dbAddress": "mongodb://localhost/test",
    "dbUser": "root",
    "dbPoolSize": 5,
    "pwdIterations": 10000,
    "mailUser": "asdf@asdg.com",
    "mailPass": "asdf",
    "sessionSecret": "asdf",
    "logLevel": "debug"
  }
  fs.writeFile('example_config.cnf', JSON.stringify(example, null, 4), done);
});

gulp.task('config:admin', () => {
  try {
    var config = JSON.parse(fs.readFileSync('./config.cnf', 'utf8').toString());
  } catch (err) {
    console.error("No config");
    process.exit(-1);
  }
  const options = {
    user: config.dbUser,
    pass: config.dbPass,
    replset: function () {
      if (config.rsName)
        return { rs_name: config.rsName }
      else return undefined;
    }(),
    server: function () {
      if (config.rsName)
        return { poolSize: config.dbPoolSize }
      else return undefined;
    }()
  }

  if (config.rsName)
    options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };

  fs.readdirSync("./utils/services/dbModels").filter(function (file) {
    return (file.indexOf(".") !== 0);
  }).forEach(function (file) {
    require("./utils/services/dbModels/" + file);
  });

  var authController = require('./controllers/authController.js');

  return mongoose.connect(config.dbAddress, options).then(() => {
    return authController.SHA256(argv.p.toString());
  }).then((pwdHash) => {
    return authController.generateSaltedPassword(pwdHash, config.pwdIterations);
  }).then((saltedPassword) => {
    var newAdmin = mongoose.model("UserModel")({
      alias: argv.u.toString(),
      slug: slug(argv.u.toString()),
      pwd: saltedPassword,
      name: argv.n.toString(),
      role: "admin"
    });
    return newAdmin.save();
  }).then(() => {
    return mongoose.disconnect();
  });
});


gulp.task('config:mail', () => {
  return gulp.src('initialData/mail/**/*').pipe(gulp.dest('uploaded/mail'));
});

gulp.task('build:dev', (cb) => {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('build:prod', (cb) => {
  exec('ng build --prod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

