/**
 * Main Config
 */

'use strict';

var path = require('path');
var env = require('../../env.json') || {};

console.log(env)

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  root: path.normalize(__dirname + '../../../'),
  mailer: {
  	email: process.env.NODE_MAILER_EMAIL || env.NODE_MAILER_EMAIL,
  	password: process.env.NODE_MAILER_EMAIL || env.NODE_MAILER_PASSWORD
  }
};