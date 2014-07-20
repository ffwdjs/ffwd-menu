'use strict';
module.exports = function(config) {
  config = config || {};

  return {
    options: {},

    prod: {
      files: {
        '<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>.min.js': ['<%= pkg.ffwd.dist %>/scripts/<%= pkg.name %>.js']
      }
    }
  };
};