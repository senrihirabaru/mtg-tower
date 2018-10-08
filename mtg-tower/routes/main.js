var express = require('express');
var router = express.Router();

/* POST main page. */
router.post('/', function(req, res, next) {
  res.render('main', {});
});

module.exports = router;
