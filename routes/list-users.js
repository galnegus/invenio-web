var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var users = [{'firstName': 'tobias', 'lastName': 'gg'},
          {'firstName': 'tobias2', 'lastName': 'qq'}];

  res.render('list-users', {users: users});
});

module.exports = router;
