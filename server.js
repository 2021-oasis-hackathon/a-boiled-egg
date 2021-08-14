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
app.get("/mainpage",(request,response) => {
  response.render('mainpage.ejs')
});
app.get("/page1",(request,response) => {
    response.render('page1.ejs')
  });
app.get("/page2",(request,response) => {
    response.render('page2.ejs')
  });
app.get("/page3",(request,response) => {
    response.render('page3.ejs')
  });
  app.get("/QnA_1",(request,response) => {
    response.render('QnA_1.ejs')
  });

  app.get("/QnA_2",(request,response) => {
    response.render('QnA_2.ejs')
  });

  app.get("/QnA_3",(request,response) => {
    response.render('QnA_3.ejs')
  });

  app.get("/QnA_4",(request,response) => {
    response.render('QnA_4.ejs')
  });

  app.get("/QnA_5",(request,response) => {
    response.render('QnA_5.ejs')
  });
//-------------------------------------------------------------------------
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
  db.collection('collection').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('QnAlist.ejs', { collections : 결과 })
  })
})