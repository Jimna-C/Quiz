// var express = require("express");
// var app     = express();
// var path    = require("path");
// var mysql = require('mysql');
// var bodyParser = require('body-parser');
// app.use(express.static(path.join(__dirname, '/public')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "admin",
//   password: "Kapture@123",
//   database: "admin"
// });
// con.connect(function(err) {
//   if (err) throw err

// });
// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/admin.html'));
// });
// app.post('/add-form',function(req,res){

//   var question=req.body.question;
//   var option1=req.body.option1;
//   var option2=req.body.option2;
//   var option3=req.body.option3;
//   var option4=req.body.option4;
//   var optioncheck=req.body.optioncheck;
// //   res.write('You sent the name "' + req.body.name+'".\n');
// //   res.write('You sent the email "' + req.body.email+'".\n');
// //   res.write('You sent the username "' + req.body.username+'".\n');

//   var sql = 'INSERT INTO `quiz`(`question`, `option1`, `option2`, `option3`, `option4`, `correct`) VALUES ("'+question+'","'+option1+'","'+option2+'","'+option3+'","'+option4+'","'+optioncheck+'")';
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//     res.redirect('/');

//   });
//   });

//   con.query("SELECT * FROM quiz", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });




// app.listen(3003);
// console.log("Running at Port 3003");




var createError = require('http-errors')
var session = require('express-session')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var db = require('./database')
var app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@123abc',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
var userRoute = require('./routes/users');
app.use('/users', userRoute)
var userRouteadmin = require('./routes/adminusers')
app.use('/', userRouteadmin)
app.get('/', function (req, res, next) {
  res.render('index', { title: 'User Form' })
})
app.post('/user_form', function (req, res, next) {
   var question=req.body.question;
    var option1=req.body.option1;
    var option2=req.body.option2;
    var option3=req.body.option3;
    var option4=req.body.option4;
    var optioncheck=req.body.optioncheck;
  var sql =  'INSERT INTO `quiz`(`question`, `option1`, `option2`, `option3`, `option4`, `correct`) VALUES ("'+question+'","'+option1+'","'+option2+'","'+option3+'","'+option4+'","'+optioncheck+'")'
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Row has been updated')
    res.redirect('/')
  })
})
app.use(function (req, res, next) {
  next(createError(404))
})
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
app.listen(3006, function () {
  console.log('Node server is running on port : 3006')
})
module.exports = app