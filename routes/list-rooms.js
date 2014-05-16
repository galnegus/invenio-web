var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var rooms = [{'name': 'inside', 'department': '4711'}, {'name': 'outside', 'department': '432'}];

  res.render('list-rooms', {rooms: rooms});
});

module.exports = router;
