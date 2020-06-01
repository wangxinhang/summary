var express = require('express');
var router = express.Router();
var dbconf = require("../util/dbconf")

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', {
  //   title: 'Express'
  // });
  let sql = `select * from user`
  let sqlArr = []
  let callBack = (err, data) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        list: data
      })
    }
  }
  dbconf.sqlConnect(sql, sqlArr, callBack)
});

module.exports = router;