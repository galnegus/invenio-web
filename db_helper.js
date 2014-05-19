var mysql = require('mysql');
var Q = require('q');

var db_config = {
  connectionLimit : 10,
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'invenio',
  multipleStatements: true
};

var pool = mysql.createPool(db_config);
exports.pool = pool;

exports.query = function(sqlQuery) {
  return Q.nfcall(pool.getConnection.bind(pool))
  .then(function(connection) {
    var result = Q.nfcall(connection.query.bind(connection), sqlQuery);
    return {result: result, connection: connection};
  })
  .then(function(queryObj) {
    queryObj.connection.release();
    return queryObj.result;
  })
  .then(function(result) {
    return result;
  })
  .catch(function(error) {
    console.log(error);
    throw new error;
  });
}