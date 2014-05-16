var mysql = require('mysql').createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'invenio'
});

mysql.connect();

module.exports = mysql;