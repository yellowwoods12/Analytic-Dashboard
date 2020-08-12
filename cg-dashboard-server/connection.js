var mysql = require('mysql');
const { promisify } = require('util');

/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'cgslate12'
});*/

var connection = mysql.createConnection({
    host     : 'db.test-cg-api.cgslate.com',
    user     : 'readadmin',
    password : 'electron@567',
    database : 'cgslate'
  });

  connection.connect(function(err){
    if(!err) {
        console.log("Database is connected using external file ... nn");
    } else {
        console.log("Error connecting database using external file... nn");
    }
    });
    

  module.exports = connection;