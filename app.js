let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('cookie-session');
// let index = require('./routes/index');
// let webservice = require('./routes/webservice');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.listen(8081);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))
.use(express.static(path.join(__dirname, 'public')))

//Enable CORS 
.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
  next(); 
})

//-------------- controller ----------------//
// .use('/', index)
// .use('/', webservice)

// // catch 404 and forward to error handler
// .use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// })

// // error handler
// .use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   console.log(err);
//   res.status(err.status || 500);
//   res.render('error.ejs',{error:err, status:"505 error"});
// })

 
module.exports = app;
