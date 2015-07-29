/**
 * Main Config
 */

'use strict';

var path = require('path');

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  root: path.normalize(__dirname + '../../../')
};