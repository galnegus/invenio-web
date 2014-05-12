var express = require('express');
var router = express.Router();

users = [{'name': 'tobias', 'department': 'dev'},
          {'name': 'tobias2', 'department': 'sleep'}];

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', users);
});

module.exports = router;
