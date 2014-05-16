var express = require('express');
var mysql = require('../db_helper.js');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('add-department');
});

router.post('/', function(req, res) {
  var query = 'CALL addDepartment(\'' + req.body.department_name  + '\')';
  mysql.query(query, function(err, result) {
    if (err) {
        console.log(err);
    }
    res.redirect('/departments');
  });
});

module.exports = router;
