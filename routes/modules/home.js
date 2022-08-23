const express = require('express');
const Restaurant = require('../../models/Restaurants');

const router = express.Router();



 //搜尋結果頁面
router.get('/search' , (req , res) => {

  const userId = req.user._id;
  let inputKeyword = req.query.keyword.replace(/\s*/g, "").toLowerCase();
  let currentKeyword = req.query.keyword.replace(/\s*/g, "");

  let filteredRestaurant = [];

  function getResultAmount(){
    return filteredRestaurant.length?
    `- 搜尋餐廳或分類含「${currentKeyword}」 之結果共 ${filteredRestaurant.length} 筆 -` :
    `- 查無餐廳或分類含「${currentKeyword}」 之結果 -`;
  }

  Restaurant.find({ userId })
            .lean()
            .sort({ _id : 'asc'})
            .then(restaurants => 
              filteredRestaurant = restaurants.filter(item =>
              item.name.toLowerCase().includes(inputKeyword) ||
              item.category.toLowerCase().includes(inputKeyword)))

            .then( () => res.render('index' , {restaurantList : filteredRestaurant , keyword : currentKeyword , alert : getResultAmount()}))

            .catch(error => console.log(error))
});

//sort結果頁面-依名字排序
router.get(('/sort_asc') , (req , res) => {
  const userId = req.user._id;

  return Restaurant
  .find({ userId })
  .lean()
  .sort({ name : 'asc'})
  .then(restaurants => res.render('index' , {restaurantList : restaurants , asc_selected : 'selected'}))
  .catch(error => console.log(error))
});
//sort結果頁面-依名字排序
router.get(('/sort_desc') , (req , res) => {
  const userId = req.user._id;
  selectedsort = 'Z-A';
  return Restaurant
  .find({ userId })
  .lean()
  .sort({ name : 'desc'})
  .then(restaurants => res.render('index' , {restaurantList : restaurants , desc_selected : 'selected'}))
  .catch(error => console.log(error))
});
//sort結果頁面-依類別排序
router.get(('/sort_category') , (req , res) => {
  const userId = req.user._id;

  return Restaurant
  .find({ userId })
  .lean()
  .sort({ category : 'asc'})
  .then(restaurants => res.render('index' , {restaurantList : restaurants , category_selected : 'selected'}))
  .catch(error => console.log(error))
});
//sort結果頁面-依地區排序
router.get(('/sort_location') , (req , res) => {
  const userId = req.user._id;

  return Restaurant
  .find({ userId })
  .lean()
  .sort({ location : 'asc'})
  .then(restaurants => res.render('index' , {restaurantList : restaurants , location_selected : 'selected'}))
  .catch(error => console.log(error))
});



//首頁
router.get('/' , (req , res) => {


  const userId = req.user._id;

  Restaurant.find({ userId })
           .lean()
           .sort({ _id : 'asc'})
           .then(restaurants => res.render('index' , { restaurantList : restaurants }))
           .catch(error => console.log(error))
});
 

module.exports = router;