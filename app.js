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

//show頁面
app.get("/restaurants/:id" , (req , res) => {
  const filteredRestaurant = restaurantJson.results.find(item => item.id.toString() === req.params.id);
  res.render("show" , {restaurant : filteredRestaurant});
 });
 

app.listen(port , () => {
  console.log('server is starting with port ' + port);
});