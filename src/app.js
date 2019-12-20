var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var winston = require('./utilities/Logger');
var passport=require("passport")
var morgan = require('morgan');
var sendOrderDetails=require("./utilities/producer")
var auth = require('./config/auth')
// var indexRouter = require('./routes/index');

var ordersRouter = require('./routes/orders/orders');
var usersRouter = require('./routes/users/users');



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({ secret: 'MysecretPassword', resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/',auth.gitHubAuthVerify, function(req, res){
  res.render('index', { title: "OrderAPI" });
});

// app.use('/', indexRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/users',usersRouter);



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
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login')
// }


module.exports = app;
