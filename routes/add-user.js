var express = require('express');
var router = express.Router();

/* GET user adding */
router.get('/', function(req, res) {
  res.render('add-user');
});

module.exports = router;
