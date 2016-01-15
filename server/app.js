var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressState = require('express-state');

var config = require('./config');

var app = express();
expressState.extend(app);

app.set('state namespace', 'roomBaby');
app.expose("roomBaby", 'foo');


var server = require('http').Server(app);

app.set('port', process.env.PORT || 3000);

var isProduction = (process.env.NODE_ENV === 'production');

isProduction ? app.set('env', 'production') : app.set('env', 'development');

app.set('views', path.join(config.root, 'server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(config.root, 'client')));

require('./routes/index')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode');
});

module.exports = app;
