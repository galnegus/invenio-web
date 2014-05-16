var express = require('express');
var mysql = require('../db_helper.js');
var router = express.Router();

router.get('/', function(req, res) {
  var departments = ['aaaaaass', 'bbbbb'];

  res.render('add-room', { departments: departments });
});

router.post('/', function(req, res) {
  var query = 'CALL addRoom(\'' + req.body.department_name  + '\')';
  mysql.query(query, function(err, result) {
    if (err) {
        console.log(err);
    }
    res.redirect('/rooms');
  });
});

module.exports = router;
