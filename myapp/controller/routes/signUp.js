var express = require('express');
var crypto = require('crypto');
var router = express.Router();

var Datastore=require('nedb');
//var db=new Datastore({filename: 'user.db', autoload: true});

router.get('/',function(req,res){
    res.render('signup');
  });

router.post('/', async(req, res, next)=>{
    var hash = crypto.createHash('sha512');
    hash.update(req.body.password);
    var hashedPassword = hash.digest('hex');
    var userData={
        email: req.body.email,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        password: hashedPassword,
        birthday: req.body.birthday_year+'-'+req.body.birthday_month+'-'+req.body.birthday_day
    };
    console.log(userData);
    req.app.locals.db.loadDatabase();
    await req.app.locals.db.find({ email: userData.email },function(err,docs){
        if(docs.length!==0){
            res.render('alert',{message:'\'이미 존재하는 계정입니다!git \'',redirect:'\'/signUp\''});
        }
        else{
            req.app.locals.db.insert(userData,function(err, newDoc){
                if(err){
                    console.log(err);
                    return;
                }
                console.log(newDoc);
            });
            res.redirect('/');
        }
    });
});
module.exports = router;