var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Datastore = require('nedb');

var indexRouter = require('./controller/routes/index');
var usersRouter = require('./controller/routes/users');
var signUpRouter = require('./controller/routes/signup');
var loginRouter = require('./controller/routes/login');
var become_a_hostRouter = require('./controller/routes/become_a_host');

var app = express();

app.locals.db= new Datastore({ filename: './database/user.db', autoload: true });
app.locals.accommodationDB=new Datastore({filename: './database/accommodation.db',autoload:true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/become_a_host', become_a_hostRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
