var express = require('express');
var router = express.Router();

var Datastore=require('nedb');
var db=new Datastore({filename: 'user.db', autoload: true});

router.get('/',function(req,res){
    res.render('signUp');
  });

router.post('/', function(req, res){
    var userData={
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        birthday: req.body.birthday
    };
    db.insert(userData,function(err, newDoc){
        if(err){
            console.log(err);
            return;
        }
        console.log(newDoc);
    })
});
module.exports = router;