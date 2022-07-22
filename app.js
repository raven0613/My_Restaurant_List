const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 3000;
const restaurantJson = require('./public/restaurant.json');

app.engine('handlebars' , exphbs.engine({ defaultLayout : 'main' }));
app.set('view engine' , 'handlebars');


app.use(express.static('public'));

//首頁
app.get('/' , (req , res) => {
  res.render('index' , {restaurantList : restaurantJson.results});
});


app.listen(port , () => {
  console.log('server is starting with port ' + port);
});