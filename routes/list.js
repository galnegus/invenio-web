var express = require('express');
var db = require('../db_helper.js');
var Q = require('q');
var router = express.Router();

// beacons
router.get('/beacons', function(req, res) {
  db.query('CALL getAllBeacons')
  .then(function(result) {
    res.render('list-beacons', { beacons: result[0][0] });
  });
});

// departments
router.get('/departments', function(req, res) {
  db.query('CALL getAllDepartments')
  .then(function(result) {
    res.render('list-departments', { departments: result[0][0] });
  });
});

// roles
router.get('/roles', function(req, res) {
  db.query('CALL getAllRoles')
  .then(function(result) {
    res.render('list-roles', { roles: result[0][0] });
  });
});

//rooms
router.get('/rooms', function(req, res) {
  db.query('CALL getAllRooms')
  .then(function(result) {
    res.render('list-rooms', { rooms: result[0][0] });
  });
});

// users
router.get('/users', function(req, res) {
  db.query('CALL getAllUsers')
  .then(function(result) {
    res.render('list-users', { users: result[0][0] });
  });
});

// phone number types
router.get('/phone-number-types', function(req, res) {
  db.query('CALL getAllPhoneNumberTypes')
  .then(function(result) {
    res.render('list-phone-number-types', { phone_number_types: result[0][0] });
  });
});

// user phone numbers
router.get('/user-phone-numbers/:user_id', function(req, res) {
  db.query('CALL getPhoneNumbers(' + db.pool.escape(req.params.user_id) + ')')
  .then(function(result) {
    res.render('list-user-phone-numbers', { user_id: req.params.user_id, phone_numbers: result[0][0] });
  });
});

module.exports = router;
