var express = require('express');
var pool = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon', function(req, res) {
  departments = ['none','aaaaa','bbbbb'];
  rooms = ['none', '123', '546'];

  res.render('add-beacon', {departments: departments, rooms: rooms});
});

// department
router.get('/department', function(req, res) {
  res.render('add-department');
});

router.post('/department', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL addDepartment(\'' + req.body.department_name  + '\')';

    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/departments');
    });

    connection.release();
  });
});

// role
router.get('/role', function(req, res) {

  res.render('add-role');
});

// room
router.get('/room', function(req, res) {
  var departments = ['aaaaaass', 'bbbbb'];

  res.render('add-room', { departments: departments });
});

router.post('/room', function(req, res) {
    res.redirect('/rooms');
});

// user
router.get('/user', function(req, res) {
  res.render('add-user');
});

module.exports = router;
