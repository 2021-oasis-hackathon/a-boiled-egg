const express = require('express');
const app = express();


app.listen(3000, function(요청, 응답){
    console.log('서버실행!');
})

//-------------------------------------------------------------------------

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//-------------------------------------------------------------------------

app.get("/page1",(request,response) => {
    response.render('page1.ejs')
  });
app.get("/page2",(request,response) => {
    response.render('page2.ejs')
  });
app.get("/page3",(request,response) => {
    response.render('page3.ejs')
  });