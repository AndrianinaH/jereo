let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('cookie-session');
// let index = require('./routes/index');
let webservice = require('./routes/webservice');

let app = express();


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

.use(express.static(__dirname + '/dist'))

//-------------- controller ----------------//
// .use('/', index)
.use('/', webservice)
app.listen(process.env.PORT || 3000);

