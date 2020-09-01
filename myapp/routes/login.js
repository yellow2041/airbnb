var express = require('express');
var router = express.Router();

var Datastore = require('nedb');
var db = new Datastore({ filename: 'user.db', autoload: true });

var sessionTable={};

function randomSID() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var sid = '';
    for (var i = 0; i < 30; i++)
        sid += chars.charAt(Math.floor(Math.random() * chars.length));
    return sid;
}

router.get('/', function (req, res) {
    res.render('login', { title: "login", time: Date() });
});

router.post('/', function (req, res) {
    console.log(req.body);
    console.log(res.locals.sessionTable);
    db.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
        if (!err) {
            console.log(docs);
            if (docs.length!==0) {
                const sid=randomSID();
                sessionTable[sid]=docs.email;
                res.cookie('sid',sid,{maxAge:300000});
                res.cookie('name',req.body.email)
                res.redirect('/');
            }
            else{
                res.send('<script type="text/javascript">alert(\'로그인 정보를 확인해주세요!\');</script>');
            }
        }
    })
});
module.exports = router;