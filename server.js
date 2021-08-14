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
//-------------------------------------------------------------------------
app.post('/add', function(request,response){
  response.send('전송완료');
  console.log(request.body);
  console.log(request.body.contents[1])
  for ( let i=0 ; i<3 ; i++ ){
    db.collection('collection').insertOne( { 내용: request.body.contents[i]} , function(에러,결과){
      console.log('저장완료!');
    });
  }
  
});