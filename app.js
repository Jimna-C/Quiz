var createError = require('http-errors')
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')

var mysql = require('mysql')
var connection = require('./database')
var userRoute = require('./routes/users');
var userRouteadmin = require('./routes/adminusers')
var app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


app.use('/users', userRoute)
app.use('/admin', userRouteadmin)



app.use(function (req, res, next) {
  next(createError(404))
})

////////////post data/////////////////////
/* GET home page. */
 
// app.post("/add", function(req, res, next) {
//   var question=req.body.question;
//     var option1=req.body.option1;
//     var option2=req.body.option2;
//     var option3=req.body.option3;
//     var option4=req.body.option4;
//     var optioncheck=req.body.optioncheck;
 
//   var sql = 'INSERT INTO `quiz`(`question`, `option1`, `option2`, `option3`, `option4`, `correct`) VALUES ("'+question+'","'+option1+'","'+option2+'","'+option3+'","'+option4+'","'+optioncheck+'")';
//   connection.query(queryString, function (err, result) {
//     if (err) {
//         // Throw your error output here.
//         console.log("An error occurred.");
//     } else {
//         // Throw a success message here.
//         console.log("1 record successfully inserted into db");
//     }
// });
// });
//   app.post('/add-form',function(req,res){
  
//     var question=req.body.question;
//     var option1=req.body.option1;
//     var option2=req.body.option2;
//     var option3=req.body.option3;
//     var option4=req.body.option4;
//     var optioncheck=req.body.optioncheck;
//   //   res.write('You sent the name "' + req.body.name+'".\n');
//   //   res.write('You sent the email "' + req.body.email+'".\n');
//   //   res.write('You sent the username "' + req.body.username+'".\n');
  
//     var sql = 'INSERT INTO `quiz`(`question`, `option1`, `option2`, `option3`, `option4`, `correct`) VALUES ("'+question+'","'+option1+'","'+option2+'","'+option3+'","'+option4+'","'+optioncheck+'")';
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//       res.redirect('/');
    
//     });
//     });

/////////////////////////////////////////


app.listen(5555, function () {
  console.log('Node server running on port : 5555')
})
// error
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})
module.exports = app