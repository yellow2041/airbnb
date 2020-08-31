var express = require('express');
var app = express();
app.locals.pretty=true;
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/',function(req, res){     //res는 응답에 대한 객체, get은 라우터의 역할을 함
    res.send('Hello home page');
});
app.get('/login',function(req,res){
    res.render('login',{title:"login",time:Date()});
});
app.listen(3000, function(){
    console.log('Connected 3000 port!');
});   //port 지정