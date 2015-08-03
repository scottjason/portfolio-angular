var config = require('../config');
var mailer = require('../utils/mailer');
var transport = mailer.generateTransport();

exports.render = function(req, res, next) {
  res.render('index');
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
