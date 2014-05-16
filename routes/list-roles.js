var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var roles = [{'title': 'gg'}, {'title': 'qq'}];

  res.render('list-roles', {roles: roles});
});

module.exports = router;
