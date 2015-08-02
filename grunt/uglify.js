'use strict';

module.exports = {
  options: {
    mangle: false
  },
  dev_scripts: {
    files: {
      'client/build/dev.min.js': 'client/build/dev.js'
    }
  },
  vendor_scripts: {
    files: {
      'client/build/vendor.min.js': 'client/build/vendor.js'
    }
  }
};