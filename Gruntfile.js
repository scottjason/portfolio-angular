'use strict';

var gruntConfig = require('./grunt/config');
var taskConfig = require('./grunt/tasks');

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var configOpts = gruntConfig.getOpts(grunt);
  grunt.initConfig(configOpts);

  var serverTasks = taskConfig.get('server');
  var buildTasks = taskConfig.get('build');

  grunt.registerTask('server', serverTasks);
  grunt.registerTask('build', buildTasks);
};