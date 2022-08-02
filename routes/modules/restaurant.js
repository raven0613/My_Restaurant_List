const express = require('express');
const Restaurant = require('../../models/Restaurants');
const router = express.Router();


//新增頁面
router.get('/new' , (req , res) => {
  return res.render('new');
})


//新增資料
router.post('/' , (req , res) => {
  const {name , category , image , location , phone , google_map , rating , description} = req.body;
  return Restaurant.create(
    {name , category , image , location , phone , google_map , rating , description})
                   .then(() => res.redirect('/'))
                   .catch(error => console.log(error))
})

//編輯特定資料
router.put('/:id' , (req , res) => {
  const id = req.params.id;
  const {name , category , image , location , phone , google_map , rating , description} = req.body;

  return Restaurant.findById(id)
                   .then(restaurants => {
                      restaurants.name = name;
                      restaurants.category = category;
                      restaurants.image = image;
                      restaurants.location = location;
                      restaurants.phone = phone;
                      restaurants.google_map = google_map;
                      restaurants.rating = rating;
                      restaurants.description = description;
                      return restaurants.save();
                    })
                    .then(() => res.redirect(`/restaurant/${id}`))
                    .catch(error => console.log(error))
})

//get編輯頁面
router.get('/:id/edit' , (req , res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
                   .lean()
                   .then(restaurants => res.render('edit' , { restaurant : restaurants }))
                   .catch(error => console.log(error))
})


//show特定頁面
router.get('/:id' , (req , res) => {
  const id = req.params.id;

  return Restaurant.findById(id)
                   .lean()
                   .then(restaurants => res.render('show' , {restaurant : restaurants}))
                   .catch(error => console.log(error))
});


//刪除特定資料
router.delete('/:id' , (req , res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
                   .then(restaurants => restaurants.remove())
                   .then(() => res.redirect('/'))
                   .catch(error => console.log(error))
})

module.exports = router;