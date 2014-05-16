var express = require('express');
var mysql = require('../db_helper.js');
var router = express.Router();

router.get('/', function(req, res) {
  departments = ['none','aaaaa','bbbbb'];
  rooms = ['none', '123', '546'];

  res.render('add-beacon', {departments: departments, rooms: rooms});
});



module.exports = router;
