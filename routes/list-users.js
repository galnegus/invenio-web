var express = require('express');
var router = express.Router();

users = [{'firstName': 'tobias', 'lastName': 'gg'},
          {'firstName': 'tobias2', 'lastName': 'qq'}];

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('list-users', users);
});

module.exports = router;
