var express = require('express');
var pool = require('../db_helper.js');
var router = express.Router();

// beacons
router.get('/beacons', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL getAllBeacons';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.render('list-beacons', { beacons: result[0] });
      connection.release();
    });
    
  });
});

// departments
router.get('/departments', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL getAllDepartments';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.render('list-departments', { departments: result[0] });
      connection.release();
    });
    
  });
});

// roles
router.get('/roles', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL getAllRoles';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.render('list-roles', { roles: result[0] });
      connection.release();
    });
    
  });
});

//rooms
router.get('/rooms', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL getAllRooms';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.render('list-rooms', { rooms: result[0] });
      connection.release();
    });
    
  });
});

// users
router.get('/users', function(req, res) {
  pool.getConnection(function(err, connection) {
    var query = 'CALL getAllUsers';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.render('list-users', { users: result[0] });
      connection.release();
    });
    
  });
});

module.exports = router;
