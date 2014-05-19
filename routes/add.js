var express = require('express');
var db = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL getAllRooms';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }

      res.render('add-beacon', { rooms: result[0] });
      connection.release();
    });
  });

/*
 * WIP promises
 *
  db.getConnection()
  .then(function(connection) {
    return q.nfcall(connection.query(query))
  })
  .then(function(result) {
    res.render('add-beacon', { rooms: result[0] });
  })
  .then(function() {
    connection.release();
  })
  .catch(function(err) {
    console.log(err)
  })
*/

});


/** BROKEN PROCEDURE : foreign key constraint fails */
router.post('/beacon', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var roomObject = JSON.parse(req.body.room);
    var active = (req.body.active == 'yes' ? 1 : 0);
    var query = 'CALL addBeacon(\'' + req.body.major  + '\', \'' + req.body.minor + '\',\'' + roomObject.department_name + '\', \'' + roomObject.room_name + '\',\'' + active + '\', \'' + req.body.battery + '\')';
    console.log(query);
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/beacons');
      connection.release();
    });
  });
});

// department
router.get('/department', function(req, res) {
  res.render('add-department');
});

router.post('/department', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL addDepartment(\'' + req.body.department_name  + '\')';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/departments');
      connection.release();
    });
  });
});

// role
router.get('/role', function(req, res) {

  res.render('add-role');
});

router.post('/role', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL addRole(\'' + req.body.role_title  + '\')';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/roles');
      connection.release();
    });
  });
});

// room
router.get('/room', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL getAllDepartments';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }

      res.render('add-room', { departments: result[0] });
      connection.release();
    });
  });
});

/**
 * BROKEN PROCEDURE, error: column 'default_room_name_id' cannot be null
 */
router.post('/room', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL addRoom(\'' + req.body.room_name  + '\', \'' + req.body.department_name + '\')';
    console.log(query);
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/rooms');
      connection.release();
    });
  });
});

// user
router.get('/user', function(req, res) {
  res.render('add-user');
});

router.post('/user', function(req, res) {
  db.pool.getConnection(function(err, connection) {
    var query = 'CALL addUser(\'' + req.body.user_id  + '\', \'' + req.body.first_name + '\', \'' + req.body.last_name + '\', \'' + req.body.password + '\')';
    connection.query(query, function(err, result) {
      if (err) {
          console.log(err);
      }
      res.redirect('/list/users');
      connection.release();
    });    
  });
});

module.exports = router;
