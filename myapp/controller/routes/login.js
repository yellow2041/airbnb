var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var session = require('../session');

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
                var hash = crypto.createHash('sha512');
                hash.update(req.body.password);
                var hashedPassword = hash.digest('hex');
                if (hashedPassword === docs[0].password) {
                    const sid = session.setSession(docs[0].email);
                    res.cookie('sid', sid, { maxAge: 300000 });
                    res.cookie('name', req.body.email, { maxAge: 300000 });
                    res.redirect('/');
                }
                else {
                    res.render('alert',{message:'\'로그인 정보를 확인해주세요!\'',redirect:'\'/login\''});
                }
            }
            else {
                res.render('alert',{message:'\'로그인 정보를 확인해주세요!\'',redirect:'\'/login\''});
            }
        }
    });
});
module.exports = router;