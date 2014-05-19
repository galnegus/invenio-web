var express = require('express');
var db = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon', function(req, res) {
  db.query('CALL getAllRooms')
  .then(function(result) {
    res.render('add-beacon', { rooms: result[0][0]});
  });
});


router.post('/beacon', function(req, res) {
  var roomObject = JSON.parse(req.body.room);
  var active = (req.body.active == 'yes' ? 1 : 0);
  var query = 'CALL addBeacon(\'' + req.body.major  + '\', \'' + req.body.minor + '\',\'' + roomObject.department_name + '\', \'' + roomObject.room_name + '\',\'' + active + '\', \'' + req.body.battery + '\')';
    
  db.query(query)
  .then(function(result) {
    res.redirect('/list/beacons');
  });
});

// department
router.get('/department', function(req, res) {
  res.render('add-department');
});

router.post('/department', function(req, res) {
  db.query('CALL addDepartment(\'' + req.body.department_name  + '\')')
  .then(function(result) {
    res.redirect('/list/departments');
  });
});

// role
router.get('/role', function(req, res) {
  res.render('add-role');
});

router.post('/role', function(req, res) {
  db.query('CALL addRole(\'' + req.body.role_title  + '\')')
  .then(function(result) {
    res.redirect('/list/roles');
  });
});

// room
router.get('/room', function(req, res) {
  db.query('CALL getAllDepartments')
  .then(function(result) {
    res.render('add-room', { departments: result[0][0]});
  });
});

router.post('/room', function(req, res) {
  db.query('CALL addRoom(\'' + req.body.room_name  + '\', \'' + req.body.department_name + '\')')
  .then(function(result) {
    res.redirect('/list/rooms');
  });
});

// user
router.get('/user', function(req, res) {
  res.render('add-user');
});

router.post('/user', function(req, res) {
  db.query('CALL addUser(\'' + req.body.user_id  + '\', \'' + req.body.first_name + '\', \'' + req.body.last_name + '\', \'' + req.body.password + '\')')
  .then(function(result) {
    res.redirect('/list/users');
  });
});

module.exports = router;
