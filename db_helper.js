var mysql = require('mysql');

var db_config = {
  connectionLimit : 10,
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'invenio',
  multipleStatements: true
};

exports.pool = mysql.createPool(db_config);

// http://stackoverflow.com/questions/21741496/node-mysql-when-to-release-connection-back-into-pool

exports.getConnection = function(queryParam) {
  var deferred = q.defer();
  exports.pool.getConnection(function(err, conn) {
    if (err) { 
      deferred.reject(err); 
    }
    deferred.resolve(conn);
  });
};

//module.exports = pool;