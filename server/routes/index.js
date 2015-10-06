var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');

module.exports = function(app) {
  router.get('/', indexCtrl.renderLanding);
  router.get('/portfolio', indexCtrl.renderPortfolio);
  router.get('/about', indexCtrl.renderAbout);
  router.get('/contact', indexCtrl.renderContact);
  router.post('/', indexCtrl.sendMessage);
  router.get('/*', indexCtrl.redirect);
  app.use('/', router);
}
