const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
require('./config/mongoose');


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
app.get('/restaurants/:id' , (req , res) => {
  const filteredRestaurant = restaurantJson.results.find(item => item.id.toString() === req.params.id);
  res.render('show' , {restaurant : filteredRestaurant});
 });

 
//搜尋結果頁面
app.get('/search' , (req , res) => {
  let inputKeyword = req.query.keyword.replace(/\s*/g, "").toLowerCase();
  let currentKeyword = req.query.keyword.replace(/\s*/g, "");

  const filteredRestaurant = restaurantJson.results.filter(item =>
    item.name.toLowerCase().includes(inputKeyword) ||
    item.category.toLowerCase().includes(inputKeyword));

  const noResultAlert = filteredRestaurant.length?
    `- 搜尋餐廳或分類含「${currentKeyword}」 之結果共 ${filteredRestaurant.length} 筆 -` :
    `- 查無餐廳或分類含「${currentKeyword}」 之結果 -`;
  
  res.render('index' , {restaurantList : filteredRestaurant , keyword : currentKeyword , alert : noResultAlert});
 });
 



 
app.listen(port , () => {
  console.log('server is starting with port ' + port);
});