const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));


app.listen(3000, function(요청, 응답){
    console.log('서버실행!');
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
  console.log(request.body)
});