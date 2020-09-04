var express = require('express');
var session = require('../session');
var router = express.Router();

router.get('/',function(req,res){
    if(("sid" in req.cookies)&&session.getSession(req.cookies["sid"]))
        res.render('become_a_host');
    else
        res.render('alert',{message:'로그인을 해주세요.',redirect:'/login'});
  });

router.post('/', async(req, res, next)=>{
    var accommodationData={
        explanation: req.body.explanation,
        type: req.body.type,
        region: req.body.region,
        detailed_region: req.body.detailed_region,
        original_price: req.body.original_price,
        discounted_price: req.body.discounted_price
    };
    req.app.locals.accommodationDB.loadDatabase();
    req.app.locals.accommodationDB.insert(accommodationData,function(err, newDoc){
        if(err){
            console.log(err);
            return;
        }
    });
    res.redirect('/');
});
module.exports = router;