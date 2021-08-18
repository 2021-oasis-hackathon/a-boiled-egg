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


//미들웨어-------------------------------------------------------------------------

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(express.urlencoded({extended: true}))


//----------------------------------------------------------------------------로그인기능세팅
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//-------------------------------------------------------------------------
app.get("/face",(request,response) => {
  response.render('index.ejs')
});
app.get("/mainpage",(request,response) => {
  response.render('mainpage.ejs')
});

app.get("/page1",(request,response) => {
  response.render('page1.ejs')
});

app.get("/help",(request,response) => {
  response.render('help.ejs')
});






//-------------------------------------------------------------------------저장하기
// app.post('/add', function(request,response){
//   response.send('전송완료');
//   console.log(request.body);
//   for ( let i=0 ; i<3 ; i++ ){
//     db.collection('collection').insertOne( { _id : i, 내용: request.body.contents[i]} , function(에러,결과){
//       console.log('저장완료!');
//     });
//   }
// });



//-------------------------------------------------------------------------몽고db 모든 데이터 가져오기
app.get('/list', function(요청, 응답){
  for ( let i=0 ; i<3 ; i++ ){
    db.collection('collection').find({_id : 2}).toArray(function(에러, 결과){
      console.log(결과)
    })
  }
})



//-----------------------------------------------------------------------------로그인포스트요청실행
app.post('/add', passport.authenticate('local', {
  failureRedirect : '/fail'
}), function(req, res){
  res.redirect('/mainpage')
});






passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (input_id, input_pw, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: input_id }, function (error, result) {
    if (error) return done(error)

    if (!result) return done(null, false, { message: '존재하지않는 아이디입니다' })
    if (input_pw == result.pw) {
      return done(null, result)
    } else {
      return done(null, false, { message: '비미번호가 틀렸어요' })
    }
  })
}));
//-----------------------------------------------로그인세션만들기
passport.serializeUser(function (user, done) {
  done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
  db.collection('login').findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과)
  })
}); 

//-------------------------------------------

app.get("/page2", dologin,(request,response) => {
  console.log(request.query.time)
  response.render('page2.ejs',)
});

app.get("/page3",dologin,(request,response) => {
  response.render('page3.ejs')
});


function dologin(request, response, next){
  console.log(request.user)
  if (request.user){
    next();
  } else {
    response.render('page1.ejs')
  };
};
