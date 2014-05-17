var express = require('express');
var router = express.Router();

// beacons
router.get('/beacons', function(req, res) {
  var beacons = [{'major': '115345345', 'minor': 'de134513v', 'room': 'outside', 'department': '2'},
          {'major': '35674567', 'minor': '345 wer g', 'room': 'inside', 'department': '4:32'}];

  res.render('list-beacons', {beacons: beacons});
});

// departments
router.get('/departments', function(req, res) {
  var departments = [{'name': 'aaaaa'}, {'name': 'bbbbb'}];

  res.render('list-departments', {departments: departments});
});

// roles
router.get('/roles', function(req, res) {
  var roles = [{'title': 'gg'}, {'title': 'qq'}];

  res.render('list-roles', {roles: roles});
});

//rooms
router.get('/rooms', function(req, res) {
  var rooms = [{'name': 'inside', 'department': '4711'}, {'name': 'outside', 'department': '432'}];

  res.render('list-rooms', {rooms: rooms});
});

// users
router.get('/users', function(req, res) {
  var users = [{'firstName': 'tobias', 'lastName': 'gg'},
          {'firstName': 'tobias2', 'lastName': 'qq'}];

  res.render('list-users', {users: users});
});

module.exports = router;
