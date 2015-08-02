'use strict';

var gruntConfig = require('./grunt/config');
var taskConfig = require('./grunt/tasks');

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var configOpts = gruntConfig.getOpts(grunt);
  grunt.initConfig(configOpts);

  var serverTasks = taskConfig.get('server');
  var deployTasks = taskConfig.get('deploy');

  grunt.registerTask('server', serverTasks);
  grunt.registerTask('deploy', deployTasks);
};