const gulp = require('gulp'),
  mkdirp = require('mkdirp'),
  del = require('del'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  fs = require('fs'),
  tscConfig = require('./tsconfig.json'),
  gulpTypings = require("gulp-typings"),
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  systemjsBuilder = require('gulp-systemjs-builder'),
  argv = require('yargs').argv,
  slug = require('slug');

  
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
    'node_modules/bootstrap/**/*', 'node_modules/ng2-interceptors/**/*',
    'node_modules/ng2-bootstrap/**/*', 'node_modules/crypto-js/**/*',
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
  return gulp.src(['frontend/src/**/*', 'frontend/src/index.html', '!frontend/src/**/*.ts', '!frontend/src/typings.json'], { base: './frontend/src/' })
    .pipe(gulp.dest('frontend/dist'))
});

gulp.task('config:example', (done) => {
  var example = {
    "serverName": "Test",
    "port": 3000,
    "uploadedBase": "./uploaded",
    "dbAddress": "mongodb://localhost/test",
    "dbUser": "root",
    "dbPoolSize": 5,
    "sessionSecret": "asdf",
    "logLevel": "debug"
  }
  fs.writeFile('example_config.cnf', JSON.stringify(example, null, 4), done);
})

gulp.task('watch:frontend', function () {
  gulp.watch(['frontend/src/**/*', '!frontend/src/**/*.ts'], gulp.series('copy:assets'));
  gulp.watch('frontend/src/**/*.ts', gulp.series('compile'));
});


gulp.task('build:dev', gulp.series('clean', 'downloadTypings', "copyTypings", gulp.parallel('compile', 'copy:indlibs', 'copy:assets', 'copy:foldlibs'), 'emptybundle'));

gulp.task('build:prod', gulp.series('clean', 'downloadTypings', "copyTypings", gulp.parallel('compile', 'copy:indlibs', 'copy:assets', 'copy:foldlibs'), 'bundle'));


