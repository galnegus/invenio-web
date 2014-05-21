var express = require('express');
var db = require('../db_helper.js');
var router = express.Router();

// beacon
router.get('/beacon/:major/:minor', function(req, res) {
  var edit;
  db.query('CALL getBeacon(' + db.pool.escape(req.params.major) + ',' + db.pool.escape(req.params.minor) + ')')
  .then(function(result) {
    edit = result[0][0][0];
  })
  .then(function() {
    return db.query('CALL getAllRooms');
  }) 
  .then(function(result) {
    res.render('add-edit-beacon', { rooms: result[0][0], edit: edit });
  });
});

// department
router.get('/department/:id', function(req, res) {
  db.query('CALL getDepartment(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.render('add-edit-department', { edit: result[0][0][0] });
  });
});

// role
router.get('/role/:id', function(req, res) {
  db.query('CALL getRole(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.render('add-edit-role', { edit: result[0][0][0] });
  });
});

// room
router.get('/room/:default_room_name_id/:department_id', function(req, res) {
  var edit;
  db.query('CALL getRoom(' + db.pool.escape(req.params.default_room_name_id) + ',' + db.pool.escape(req.params.department_id) + ')')
  .then(function(result) {
    edit = result[0][0][0];
  })
  .then(function() {
    return db.query('CALL getAllDepartments');
  }) 
  .then(function(result) {
    res.render('add-edit-room', { departments: result[0][0], edit: edit });
  });
});

// user
router.get('/user/:user_id', function(req, res) {
  db.query('CALL getUser(' + db.pool.escape(req.params.user_id) + ')')
  .then(function(result) {
    res.render('add-edit-user', { edit: result[0][0][0] });
  });
});

module.exports = router;
