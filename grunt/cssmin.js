'use strict';

module.exports = {
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  dev_styles: {
    files: {
      'client/build/dev.min.css': ['client/build/dev.css']
    }
  },
  vendor_styles: {
    files: {
      'client/build/vendor.min.css': ['client/build/vendor.css']
    }
  }
};