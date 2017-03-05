const gulp = require('gulp'),
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
  slug = require('slug');
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

gulp.task('clean', () => {
  return del('frontend/dist/**/*');
});

gulp.task("downloadTypings", function () {
  var stream = gulp.src("./typings.json")
    .pipe(gulpTypings()); //will install all typingsfiles in pipeline. 
  return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished. 
});

gulp.task("copyTypings", function () {
  return gulp.src("typings/**/*", { base: "./" })
    .pipe(gulp.dest('frontend/src')); //will copy all typingsfiles to src.
});

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({
      cwd: "",
      base: "",
      path: filename,
      contents: new Buffer(string)
    }))
    this.push(null)
  }
  return src
}

gulp.task("emptybundle", (done) => {
  ensureExists("./frontend/dist/bundle/app").then(() => {
    fs.writeFile('./frontend/dist/bundle/app/main.js', "", done);
  });
});

gulp.task("bundle", function () {
  var builder = systemjsBuilder("./frontend/dist", './frontend/dist/systemjs.config.js');
  return builder.bundle('app/main.js', {
    minify: true,
    mangle: false
  })
    .pipe(gulp.dest('./frontend/dist/bundle'));
});


gulp.task('compile', () => {
  return gulp
    .src(['frontend/src/**/*.ts', 'node_modules/typescript/lib/lib.es6.d.ts'])
    .pipe(sourcemaps.init())          
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))      
    .pipe(gulp.dest('frontend/dist'));
});


gulp.task('copy:foldlibs', () => {
  return gulp.src(['node_modules/@angular/**/*', 'node_modules/rxjs/**/*',
    'node_modules/bootstrap/**/*', 'node_modules/scrollreveal/**/*',
    'node_modules/ng2-scrollspy/**/*', 'node_modules/ng2-scrollreveal/**/*', 'node_modules/ng2-interceptors/**/*',
    'node_modules/ng2-bootstrap/**/*', 'node_modules/crypto-js/**/*',  
    'node_modules/ng2-page-scroll/**/*','node_modules/angular2-google-maps/**/*',
    'node_modules/swipebox/**/*', 'node_modules/moment/**/*', 'node_modules/jquery/**/*'],
    { base: "./node_modules/" })
    .pipe(gulp.dest('frontend/dist/lib'));
});

gulp.task('copy:indlibs', () => {
  return gulp.src([
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js'
  ])
    .pipe(gulp.dest('frontend/dist/lib'))
});


gulp.task('copy:assets', () => {
  return gulp.src(['frontend/src/**/*', 'frontend/src/index.html', '!frontend/src/**/*.less','!frontend/src/**/*.ts', '!frontend/src/typings.json'], { base: './frontend/src/' })
    .pipe(gulp.dest('frontend/dist'))
});

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
    } (),
    server: function () {
      if (config.rsName)
        return { poolSize: config.dbPoolSize }
      else return undefined;
    } ()
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


gulp.task('less', function () {
  return gulp.src('frontend/src/**/*.less', { base: './frontend/src/' })
    .pipe(less()).on('error', (e) => { 
    console.log(e);
  })
    .pipe(gulp.dest('frontend/dist'));
});


gulp.task('watch:frontend', function () {
  gulp.watch(['frontend/src/**/*.less'], gulp.series('less'));
  gulp.watch(['frontend/src/**/*', '!frontend/src/**/*.ts'], gulp.series('copy:assets'));
  gulp.watch('frontend/src/**/*.ts', gulp.series('compile'));
});


gulp.task('build:dev', gulp.series('clean', 'downloadTypings', "copyTypings", gulp.parallel('compile', 'copy:indlibs', 'copy:assets','less' ,'copy:foldlibs'), 'emptybundle'));

gulp.task('build:prod', gulp.series('clean', 'downloadTypings', "copyTypings", gulp.parallel('compile', 'copy:indlibs', 'copy:assets', 'less' ,'copy:foldlibs'), 'bundle'));


