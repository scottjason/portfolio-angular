'use strict';

module.exports = {
  concat: ['concat:dev_scripts', 'concat:vendor_scripts', 'concat:dev_styles'],
  minify: ['uglify:dev_scripts', 'cssmin:dev_styles'],
  watch: ['watch:scripts', 'watch:styles', 'nodemon'],
  options: {
    logConcurrentOutput: true
  }
};