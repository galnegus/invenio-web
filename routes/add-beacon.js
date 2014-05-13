var express = require('express');
var router = express.Router();

/* GET beacon adding. */
router.get('/', function(req, res) {
  res.render('add-beacon');
});

module.exports = router;
