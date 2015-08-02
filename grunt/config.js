'use strict';

exports.getOpts = function(grunt) {
  var configOpts = {
    pkg: grunt.file.readJSON('package.json'),
    clean: require('./clean'),
    concat: require('./concat'),
    concurrent: require('./concurrent'),
    copy: require('./copy'),
    cssmin: require('./cssmin'),
    nodemon: require('./nodemon'),
    uglify: require('./uglify'),
    watch: require('./watch')
  }
  return configOpts;
};