var express = require('express');
var router = express.Router();
var user = require("../controllers/user");

/* GET home page. */
router.get('/', function (req, res, next) {
  user.getUserList(req, res)
});
router.get('/a', function (req, res, next) {
  user.getUserById(req, res)
});
module.exports = router;