var express = require('express')
var connection = require('../database.js')
var router = express.Router()

router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM quiz', function (err, rows) {
    if (err) {
      req.flash('error', err)
      res.render('index', { data: '' })
    } else {
      res.render('index', { data: rows })
     
    }
  })
})
module.exports = router