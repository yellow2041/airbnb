var express = require('express');
var router = express.Router();
var session = require('../session');

//var Datastore = require('nedb');
//var db = new Datastore({ filename: 'user.db', autoload: true });

router.get('/', function (req, res) {
    if(session.getSession(req.cookies["sid"])){
        session.deleteSession(req.cookies["sid"]);
        delete req.cookies["name"];
        delete req.cookies["sid"];
        res.redirect('/');
    }
    else
        res.render('login', { title: "login", time: Date() });
});

router.post('/', function (req, res) {
    req.app.locals.db.loadDatabase();
    req.app.locals.db.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
        if (!err) {
            if (docs.length!==0) {
                const sid=session.setSession(docs.email);
                res.cookie('sid',sid,{maxAge:300000});
                res.cookie('name',req.body.email,{maxAge:300000});
                res.redirect('/');
            }
            else{
                res.render('loginAlert');
            }
        }
    });
});

module.exports = router;