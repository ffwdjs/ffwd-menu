(function() {
  'use strict';
  var allTestFiles = [
    'chai'
  ];
  var TEST_REGEXP = /(spec|test)\.js$/i;

  var pathToModule = function(path) {
    return path.replace(/^\/base\//, '').replace(/\.js$/, '');
  };

  Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
      // Normalize paths to RequireJS module names.
      allTestFiles.push(pathToModule(file));
    }
  });

  var config = {
    paths: {
      'underscore':         'node_modules/ffwd-utils/node_modules/underscore/underscore',
      'underscore.string':  'node_modules/ffwd-utils/node_modules/underscore.string/lib/underscore.string',
      'ffwd-utils':         'node_modules/ffwd-utils/client/scripts/index',
      'ffwd-menu':          'client/scripts/index',
      'chai':               'node_modules/chai/chai',
    },

    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base',

    // dynamically load all test files
    deps: allTestFiles,

    shim: {
    },

    // we have to kickoff jasmine, as it is asynchronous
    callback: function() {
      /* jshint debug: true */
      debugger;
      /* jshint debug: false */
      window.__karma__.start();
    }
  };

  // console.info('karma, requirejs configuration', config);

  require.config(config);
}());
