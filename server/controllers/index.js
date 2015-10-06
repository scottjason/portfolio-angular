var config = require('../config');
var mailer = require('../utils/mailer');
var transport = mailer.generateTransport();


exports.renderLanding = function(req, res, next) {
  res.render('index', {pathName: null});
};

exports.renderPortfolio = function(req, res, next) {
  res.render('index', {pathName: 'portfolio'});
};

exports.renderAbout = function(req, res, next) {
  res.render('index', {pathName: 'about'});
};


exports.renderContact = function(req, res, next) {
  res.render('index', {pathName: 'contact'});
};

exports.redirect = function(req, res, next) {
  res.redirect('/');
};

exports.sendMessage = function(req, res, next) {

  mailer.generateTemplate(req.body, function(html) {

    var mailOpts = {
      to: 'scottleejason@gmail.com',
      from: config.mailer.email,
      subject: 'New message from scottleejason.com',
      html: html
    };

    transport.sendMail(mailOpts, function(err, result) {
      if (err) return next(err);
      res.status(200).end();
    });
  })
};
