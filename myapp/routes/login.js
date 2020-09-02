var express = require('express');
var router = express.Router();

//var Datastore = require('nedb');
//var db = new Datastore({ filename: 'user.db', autoload: true });

function randomSID() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var sid = '';
    for (var i = 0; i < 30; i++)
        sid += chars.charAt(Math.floor(Math.random() * chars.length));
    return sid;
}

router.get('/', function (req, res) {
    if(req.cookies["sid"] in req.app.locals.sessionTable){
        delete req.app.locals.sessionTable[req.cookies["sid"]];
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
                const sid=randomSID();
                req.app.locals.sessionTable[sid]=docs.email;
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