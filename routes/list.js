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

module.exports = router;
