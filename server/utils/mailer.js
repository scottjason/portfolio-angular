var nodemailer = require('nodemailer');
var config = require('../config');

module.exports = {
  generateTransport: function() {
    var mailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.mailer.email,
        pass: config.mailer.password
      }
    });
    return mailer;
  },
  generateTemplate: function(body, cb) {
    var message = "From: " + body.name +
      "<br>" +
      "<br>" +
      "Email: " + body.email +
      "<br>" +
      "<br>" +
      "Message:" +
      "<br>" +
      "<br>" +
      body.message +
      "<br>" +
      "<br>" +
      "~ scottleejason.com";
    cb(message);
  }
}
