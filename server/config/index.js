/**
 * Main Config
 */

'use strict';

var env = {};
var path = require('path');

var isProduction = (process.env.NODE_ENV === 'production');

if (!isProduction) {
	env = require('../../env.json');
}

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  root: path.normalize(__dirname + '../../../'),
  mailer: {
  	email: process.env.NODE_MAILER_EMAIL || env.NODE_MAILER_EMAIL,
  	password: process.env.NODE_MAILER_PASSWORD || env.NODE_MAILER_PASSWORD
  }
};