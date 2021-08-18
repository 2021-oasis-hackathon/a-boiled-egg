const express = require('express');
const app = express();


const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://hackathon1234:qwer1234@cluster0.9xmuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(error, client){
  if (error) return console.log(error);
  db = client.db('database');
  app.listen(3000, function(request, response){
    console.log('서버실행!');
  });
})


//-------------------------------------------------------------------------

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: true}))

//-------------------------------------------------------------------------
app.get("/face",(request,response) => {
  response.render('index.ejs')
});
app.get("/mainpage",(request,response) => {
  response.render('mainpage.ejs')
});

app.get("/page2",(request,response) => {
    response.render('page2.ejs')
  });
app.get("/page3",(request,response) => {
    response.render('page3.ejs')
  });



//-------------------------------------------------------------------------저장하기
app.post('/add', function(request,response){
  response.send('전송완료');
  console.log(request.body);
  for ( let i=0 ; i<3 ; i++ ){
    db.collection('collection').insertOne( { _id : i, 내용: request.body.contents[i]} , function(에러,결과){
      console.log('저장완료!');
    });
  }
});



//-------------------------------------------------------------------------몽고db 모든 데이터 가져오기
app.get('/list', function(요청, 응답){
  for ( let i=0 ; i<3 ; i++ ){
    db.collection('collection').find({_id : 2}).toArray(function(에러, 결과){
      console.log(결과)
    })
  }
})


//----------------------------------------------------------------------------로그인기능
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/page1",(request,response) => {
  response.render('page1.ejs')
});