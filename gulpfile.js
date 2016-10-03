const gulp = require('gulp'),
  del = require('del'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  fs = require('fs'),
  tscConfig = require('./tsconfig.json');

gulp.task('clean', () => {
  return del('frontend/dist/**/*');
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
  return gulp.src(['node_modules/@angular/**/*', 'node_modules/rxjs/**/*'], { base: "./node_modules/" })
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
  gulp.watch('frontend/src/**/*',gulp.series('compile'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('compile', 'copy:indlibs', 'copy:assets', 'copy:foldlibs')));