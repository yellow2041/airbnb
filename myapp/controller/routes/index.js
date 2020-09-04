var express = require('express');
var router = express.Router();
var session=require('../session');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!("sid" in req.cookies)){
    res.render('index',{button: '로그인', user:'', isLogin: false});
  }
  else{
    if(session.getSession(req.cookies["sid"]))
      res.render('index',{button:'로그아웃',user: req.cookies["name"]+'님 안녕하세요!', isLogin: true});
    else
      res.render('index',{button: '로그인', user:'', isLogin: false});
  }
});

module.exports = router;