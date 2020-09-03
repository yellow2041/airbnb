var express = require('express');
var router = express.Router();

var Datastore=require('nedb');
//var db=new Datastore({filename: 'user.db', autoload: true});

router.get('/',function(req,res){
    res.render('signUp');
  });

router.post('/', async(req, res, next)=>{
    var userData={
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        birthday: req.body.birthday
    };
    req.app.locals.db.loadDatabase();
    await req.app.locals.db.find({ email: userData.email },function(err,docs){
        if(docs.length!==0){
            res.render('overlappingAccount');
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