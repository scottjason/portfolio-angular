var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');

module.exports = function(app) {
  router.get('/', indexCtrl.render);
  router.post('/', indexCtrl.sendMessage);
  router.get('/*', indexCtrl.redirect);
  app.use('/', router);
}
