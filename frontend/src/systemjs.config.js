/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // map tells the System loader where to look for things
  var map = {
    'app': 'app', // 'dist',
    '@angular': 'lib/@angular',
    'rxjs': 'lib/rxjs',
    'ng2-interceptors': 'lib/ng2-interceptors',
    'crypto-js': 'lib/crypto-js',
    'ng2-bootstrap': 'lib/ng2-bootstrap',
    'moment': 'lib/moment',
    'ng2-scrollreveal': 'lib/ng2-scrollreveal/bundles/ng2-scrollreveal.min.js',
    'ng2-scrollspy':'lib/ng2-scrollspy',
    'ng2-page-scroll':'lib/ng2-page-scroll/bundles',
    'angular2-google-maps/core':'lib/angular2-google-maps'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app': { main: 'main.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  packages['ng2-interceptors'] = {
    main: 'index'
  };
  packages['crypto-js'] = {
    main: 'index'
  };
  packages['moment'] = {
    main: 'moment'
  };

  packages["ng2-scrollspy"] = {
    "main":"dist/index.js"
  };

  packages["ng2-page-scroll"] = {
    main:"ng2-page-scroll",
    defaultExtension: 'umd.min.js'
  };

  packages['rxjs'] = {
    main: 'bundles/Rx.js'
  };
  packages['ng2-bootstrap'] = {
    main: 'bundles/ng2-bootstrap.umd.min.js'
  };
  packages['angular2-google-maps/core'] = {
    main: 'core/core.umd.js'
  };
  var config = {
    map: map,
    packages: packages,
    meta: {
      'lib/scrollreveal/dist/scrollreveal.min.js': {
        format: 'amd'
      }
    }
  };
  System.config(config);
})(this);
