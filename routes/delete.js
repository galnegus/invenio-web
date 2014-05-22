var express = require('express');
var db = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon/:major/:minor', function(req, res) {
  db.query('CALL removeBeacon(' + db.pool.escape(req.params.major) + ',' + db.pool.escape(req.params.minor) + ')')
  .then(function(result) {
    res.redirect('/list/beacons');
  });
});

// department
router.get('/department/:id', function(req, res) {
  db.query('CALL removeDepartment(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.redirect('/list/departments');
  });
});

// role
router.get('/role/:id', function(req, res) {
  db.query('CALL removeRole(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.redirect('/list/roles');
  });
});

// room
router.get('/room/:default_room_name_id/:department_id', function(req, res) {
  db.query('CALL removeRoom(' + db.pool.escape(req.params.default_room_name_id) + ',' + db.pool.escape(req.params.department_id) + ')')
  .then(function(result) {
    res.redirect('/list/room');
  });
});

// user
router.get('/user/:user_id', function(req, res) {
  db.query('CALL removeUser(' + db.pool.escape(req.params.user_id) + ')')
  .then(function(result) {
    res.redirect('/list/users');
  });
});

// phone number type
router.get('/phone-number-type/:phone_number_type_id', function(req, res) {
  db.query('CALL removePhoneNumberType(' + db.pool.escape(req.params.phone_number_type_id) + ')')
  .then(function(result) {
    res.redirect('/list/phone-number-types');
  });
});

// user phone number
router.get('/user-phone-number/:user_id/:phone_number', function(req, res) {
  console.log("hej");
  db.query('CALL removeUserPhoneNumber(' + db.pool.escape(req.params.phone_number) + ')')
  .then(function(result) {
    res.redirect('/list/user-phone-numbers/' + req.params.user_id);
  });
});

module.exports = router;
