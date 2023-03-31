var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'b6eldfcrtzjwuelncfqo-mysql.services.clever-cloud.com',
  user: 'utzntugrfx3xefln', //
  password: 'UIVy9MHFxchHkvI18VAb', //
  database: 'b6eldfcrtzjwuelncfqo',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Database connected')
})
module.exports = connection
