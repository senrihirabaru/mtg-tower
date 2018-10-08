var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/users', usersRouter);

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

class Player {
  constructor(id, icon){
    this.id = id;
    this.dysplayName = '';
    this.loggedIn = false;
    this.icon = icon;
  }

  set name(name){
    this.dysplayName = name;
  }

  login(){
    if(loggeIn || this.displayName === ''){
      return false;
    }
    this.loggedIn = true;
    return true;
  }

  logout(){
    this.dysplayName = '';
    this.loggedIn = false;
  }
}

var player = {
  'Player 1':new Player('Player 1', '/images/Weatherlight.jpg'),
  'Player 2':new Player('Player 2', '/images/Mulrotha-the-Gravetide.jpg'),
  'Player 3':new Player('Player 3', '/images/Nicol-Bolas-the-Arisen.jpg'),
  'Player 4':new Player('Player 4', '/images/Adorable-Kitten.jpg')
}

app.player = player;

module.exports = app;
