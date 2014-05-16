var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var beacons = [{'major': '115345345', 'minor': 'de134513v', 'room': 'outside', 'department': '2'},
          {'major': '35674567', 'minor': '345 wer g', 'room': 'inside', 'department': '4:32'}];

  res.render('list-beacons', {beacons: beacons});
});

module.exports = router;
