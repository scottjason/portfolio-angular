'use strict';

var grunt = require('grunt');

module.exports = {
  options: {
    dateFormat: function(time) {
      grunt.log.writeln('\n The watch finished in ' + time + 'ms at' + (new Date()).toString());
      grunt.log.writeln('\n Waiting for more changes...');
    },
  },
  scripts: {
    files: [
      'client/scripts/app.js',
      'client/scripts/app.config.js',
      'client/scripts/directives/*.js',
      'client/scripts/services/*.js',
      'client/scripts/controllers/*.js'
    ],
    tasks: ['concat:dev_scripts', 'uglify:dev_scripts'],
    options: {
      spawn: false,
    }
  },
  styles: {
    files: ['client/styles/**/*.css'],
    tasks: ['concat:dev_styles', 'cssmin'],
    options: {
      spawn: false,
    }
  }
};
