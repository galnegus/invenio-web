var express = require('express');
var db = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon', function(req, res) {
  db.query('CALL getAllRooms')
  .then(function(result) {
    res.render('add-edit-beacon', { rooms: result[0][0] });
  });
});


router.post('/beacon', function(req, res) {
  var roomObject = JSON.parse(req.body.room);
  var active = (req.body.active == 'yes' ? 1 : 0);
  var query = 'CALL addBeacon(' + db.pool.escape(req.body.major)  + ',' + db.pool.escape(req.body.minor) + ',' + db.pool.escape(roomObject.department_name) + ',' + db.pool.escape(roomObject.room_name) + ',' + db.pool.escape(active) + ',' + db.pool.escape(req.body.battery) + ')';
    
  db.query(query)
  .then(function(result) {
    res.redirect('/list/beacons');
  });
});

// department
router.get('/department', function(req, res) {
  res.render('add-edit-department');
});

router.post('/department', function(req, res) {
  db.query('CALL addDepartment(' + db.pool.escape(req.body.department_name)  + ')')
  .then(function(result) {
    res.redirect('/list/departments');
  });
});

// role
router.get('/role', function(req, res) {
  res.render('add-edit-role');
});

router.post('/role', function(req, res) {
  db.query('CALL addRole(' + db.pool.escape(req.body.role_title)  + ')')
  .then(function(result) {
    res.redirect('/list/roles');
  });
});

// room
router.get('/room', function(req, res) {
  db.query('CALL getAllDepartments')
  .then(function(result) {
    res.render('add-edit-room', { departments: result[0][0] });
  });
});

router.post('/room', function(req, res) {
  db.query('CALL addRoom(' + db.pool.escape(req.body.room_name)  + ',' + db.pool.escape(req.body.department_name) + ')')
  .then(function(result) {
    res.redirect('/list/rooms');
  });
});

// user
router.get('/user', function(req, res) {
  res.render('add-edit-user');
});

router.post('/user', function(req, res) {
  db.query('CALL addUser(' + db.pool.escape(req.body.user_id)  + ',' + db.pool.escape(req.body.first_name) + ',' + db.pool.escape(req.body.last_name) + ',' + db.pool.escape(req.body.password) + ')')
  .then(function(result) {
    res.redirect('/list/users');
  });
});

// phone number type
router.get('/phone-number-type', function(req, res) {
  res.render('add-edit-phone-number-type');
});

router.post('/phone-number-type', function(req, res) {
  db.query('CALL addPhoneNumberType(' + db.pool.escape(req.body.phone_number_type) + ')')
  .then(function(result) {
    res.redirect('/list/phone-number-types');
  });
});

// user phone number
router.get('/user-phone-number/:user_id', function(req, res) {
  db.query('CALL getAllPhoneNumberTypes')
  .then(function(result) {
    res.render('add-edit-user-phone-number', { phone_number_types: result[0][0] });
  });
});

router.post('/user-phone-number/:user_id', function(req, res) {
  db.query('CALL addUserPhoneNumber(' + db.pool.escape(req.params.user_id)  + ',' + db.pool.escape(req.body.phone_number) + ',' + db.pool.escape(req.body.phone_number_type) + ',' + db.pool.escape(0) + ')')
  .then(function(result) {
    res.redirect('/list/user-phone-numbers/' + req.params.user_id);
  });
});

module.exports = router;
