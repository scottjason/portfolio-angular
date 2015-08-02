var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');

module.exports = function(app, io) {
  router.get('/', indexCtrl.render);
  router.get('/*', function(req, res, next) {
    res.redirect('/');
  });
  app.use('/', router);
}
