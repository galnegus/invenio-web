var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var departments = [{'name': 'aaaaa'}, {'name': 'bbbbb'}];

  res.render('list-departments', {departments: departments});
});

module.exports = router;
