var express = require('express');
var router = express.Router();
var crypto = require('crypto');
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
    req.app.locals.db.find({ email: req.body.email }, function (err, docs) {
        if (!err) {
            if (docs.length !== 0) {
                var deciper = crypto.createDecipher('aes256', 'password');
                deciper.update(docs[0].password, 'hex', 'ascii');
                var decipherPassword = deciper.final('ascii');
                if (req.body.password === decipherPassword) {
                    const sid = session.setSession(docs.email);
                    res.cookie('sid', sid, { maxAge: 300000 });
                    res.cookie('name', req.body.email, { maxAge: 300000 });
                    res.redirect('/');
                }
                else {
                    res.render('loginAlert');
                }
            }
            else {
                res.render('loginAlert');
            }
        }
    });
});
module.exports = router;