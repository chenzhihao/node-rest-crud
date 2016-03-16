const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const jswtAuthDecoder = require('./libs/jwtAuthDecoder');

const apiRoutes = require('./routes/api');
const tokenRoutes = require('./routes/token');
const fetchRoutes =  require('./routes/fetch');

const port = process.env.PORT || 8888;

const app = express();
app.listen(port);

/**
 * Set the secret for encoding/decoding JWT tokens
 */
app.set('jwtTokenSecret', require('./config').jwtTokenSecret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// disable X-Powered-By header
app.disable('x-powered-by');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/token', tokenRoutes);

//
//app.use('/rest',jswtAuthDecoder);
app.use('/rest', apiRoutes);

//
//app.use('/fetch', jswtAuthDecoder);
app.use('/fetch', fetchRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
