var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const datas = require('./model/db.json');
// json 을 자동으로 js 배열로 형변환
// console.log(datas) 

const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');
var makeupRouter = require('./routes/makeup');

var app = express();
var port = process.env.PORT || '4000';
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors()); // 어떤 url 요청도 모두 들어주기, url을 제한할 필요가 있음 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardRouter);
app.use('/makeup', makeupRouter);
app.get('/', ()=>{
  // res.sendFile(path.join(__dirname, 'views', 'index.html'))
  res.send('<h1>index.html</h1>')
})

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
  res.send('error');
});

app.listen(app.get('port'), ()=>{
  console.log( app.get('port') + ' listenning ')
})
// module.exports = app;
