require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter=require('./routes/category')
var branchRouter=require('./routes/branch')
var statecityRouter=require('./routes/statecity')
var fooditemsRouter=require('./routes/fooditems')
var batchRouter=require('./routes/batch')
var sectionRouter=require('./routes/section')
var studentsRouter=require('./routes/students')
var employeesRouter=require('./routes/employees')
var deliveryboyRouter=require('./routes/deliveryboy')
var adminsRouter=require('./routes/admins')
var morepictureRouter=require('./routes/morepicture')






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category',categoryRouter)
app.use('/branch',branchRouter)
app.use('/statecity',statecityRouter)
app.use('/fooditems',fooditemsRouter)
app.use('/batch',batchRouter)
app.use('/section',sectionRouter)
app.use('/students',studentsRouter)
app.use('/employees',employeesRouter)
app.use('/deliveryboy',deliveryboyRouter)
app.use('/admins',adminsRouter)
app.use('/morepicture',morepictureRouter)





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
