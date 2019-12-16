var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var flash = require('connect-flash')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admin = require("firebase-admin");
var app = express();

// firebase admin 

var serviceAccount = require("./login-312e5-firebase-adminsdk-hj7wb-3a3a7e4667.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://login-312e5.firebaseio.com"
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//we also want to send css images and other static files in views folder
//app.use(express.static('views'))
app.use(express.static(path.join(__dirname, '/views/')));
app.set('views',__dirname+'/views/')
//Give the server access to user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false}))
app.use(logger('dev'))



/*
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
*/

app.use('/', indexRouter);
app.use('/users', usersRouter);



//handle sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}))
/*
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
*/

//create authentication middle ware
function checkLoggedIn(request, resposense, next) {// if user is authenticated in the session, carry on
  if (request.isAuthenticated())
      return next();// if they aren't redirect them to the index page
  resposense.redirect('/');
}



app.get('/login',function(request,response){
  response.render('login.ejs')
})
app.post('/login', function(request,response){
  response.render('tasks.ejs')
});
app.get('/logout', function(request,response){
  response.render('login.ejs')
});


var port = "3000";
app.set('port', port);

module.exports = app;