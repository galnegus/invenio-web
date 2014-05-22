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

router.post('/beacon/:major/:minor', function(req, res) {
  var roomObject = JSON.parse(req.body.room);
  var active = (req.body.active == 'yes' ? 1 : 0);
  var query = 'CALL updateBeacon(' + db.pool.escape(req.params.major)  + ',' + db.pool.escape(req.params.minor) + ',' + db.pool.escape(roomObject.department_name) + ',' + db.pool.escape(roomObject.room_name) + ',' + db.pool.escape(active) + ',' + db.pool.escape(req.body.battery) + ')';
    
  db.query(query)
  .then(function(result) {
    res.redirect('/list/beacons');
  });
});

// department
router.get('/department/:id', function(req, res) {
  db.query('CALL getDepartment(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.render('add-edit-department', { edit: result[0][0][0] });
  });
});

router.post('/department/:id', function(req, res) {
  db.query('CALL updateDepartmentName(' + db.pool.escape(req.params.id) + ',' + db.pool.escape(req.body.department_name)  + ')')
  .then(function(result) {
    res.redirect('/list/departments');
  });
});

// role
router.get('/role/:id', function(req, res) {
  db.query('CALL getRole(' + db.pool.escape(req.params.id) + ')')
  .then(function(result) {
    res.render('add-edit-role', { edit: result[0][0][0] });
  });
});

router.post('/role/:id', function(req, res) {
  db.query('CALL updateRoleTitle(' + db.pool.escape(req.params.id) + ',' + db.pool.escape(req.body.role_title)  + ')')
  .then(function(result) {
    res.redirect('/list/roles');
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

router.post('/room/:default_room_name_id/:department_id', function(req, res) {
  db.query('CALL updateRoom(' + db.pool.escape(req.params.default_room_name_id) + ',' + db.pool.escape(req.body.room_name)  + ',' + db.pool.escape(req.params.department_id) + ',' + db.pool.escape(req.body.department_name) + ')')
  .then(function(result) {
    res.redirect('/list/rooms');
  });
});

// user
router.get('/user/:user_id', function(req, res) {
  db.query('CALL getUser(' + db.pool.escape(req.params.user_id) + ')')
  .then(function(result) {
    res.render('add-edit-user', { edit: result[0][0][0] });
  });
});

router.post('/user/:user_id', function(req, res) {
  db.query('CALL updateUser(' + db.pool.escape(req.params.user_id) + ',' + db.pool.escape(req.body.user_id)  + ',' + db.pool.escape(req.body.first_name) + ',' + db.pool.escape(req.body.last_name) + ')')
  .then(function(result) {
    if (req.body.password != '')
      return db.query('CALL setPassword(' + db.pool.escape(req.params.user_id) + ',' + db.pool.escape(req.body.password)  + ')');
    else
      return;
  })
  .then(function(result) {
    res.redirect('/list/users');
  });
});

// phone number type
router.get('/phone-number-type/:phone_number_type_id', function(req, res) {
  db.query('CALL getPhoneNumberType(' + db.pool.escape(req.params.phone_number_type_id) + ')')
  .then(function(result) {
    res.render('add-edit-phone-number-type', { edit: result[0][0][0] });
  });
});

router.post('/phone-number-type/:phone_number_type_id', function(req, res) {
  db.query('CALL updatePhoneNumberType(' + db.pool.escape(req.params.phone_number_type_id) + ',' + db.pool.escape(req.body.phone_number_type)  + ')')
  .then(function(result) {
    res.redirect('/list/phone-number-types');
  });
});

// user phone number
router.get('/user-phone-number/:user_id/:phone_number', function(req, res) {
  var edit;
  db.query('CALL getTypeOfPhoneNumber(' + db.pool.escape(req.params.phone_number) + ')')
  .then(function(result) {
    edit = result[0][0][0];
  })
  .then(function() {
    return db.query('CALL getAllPhoneNumberTypes');
  })
  .then(function(result) {
    console.log(edit);
    res.render('add-edit-user-phone-number', { edit: edit, phone_number: req.params.phone_number, phone_number_types: result[0][0] });
  });
});

router.post('/user-phone-number/:user_id/:phone_number', function(req, res) {
  db.query('CALL updateUserPhoneNumber(' + db.pool.escape(req.params.user_id)  + ','  + db.pool.escape(req.params.phone_number)  + ',' + db.pool.escape(req.body.phone_number) + ',' + db.pool.escape(req.body.phone_number_type) + ',' + db.pool.escape(0) + ')')
  .then(function(result) {
    res.redirect('/list/user-phone-numbers/' + req.params.user_id);
  });
});

module.exports = router;
