var express = require('express');
var router = express.Router();

var Datastore = require('nedb');
var db = new Datastore({ filename: 'user.db', autoload: true });

function randomSID() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 30;
    var sid = '';
    for (var i = 0; i < string_length; i++)
        sid += chars.charAt(Math.floor(Math.random() * chars.length));
    return sid;
}

router.get('/login', function (req, res) {
    res.render('login', { title: "login", time: Date() });
});

router.post('/', function (req, res) {
    db.find({ email: req.body.email, password: req.body.password }, function (err, docs) {
        if (!err) {
            if (docs !== null) {
                res.cookie('sid')
            }
        }
    })
});
module.exports = router;