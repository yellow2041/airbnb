var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.cookies);
  if(!("sid" in req.cookies)){
    res.render('index',{button: '로그인', user:'', isLogin: false});
  }
  else{
    if(req.cookies["sid"] in req.app.locals.sessionTable)
      res.render('index',{button:'로그아웃',user: req.cookies["name"]+'님 안녕하세요!', isLogin: true});
    else
      res.render('index',{button: '로그인', user:'', isLogin: false});
  }
});

module.exports = router;
