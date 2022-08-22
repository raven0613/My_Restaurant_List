const express = require('express');
const Restaurant = require('../../models/Restaurants');
const router = express.Router();


//新增頁面
router.get('/new' , (req , res) => {
  return res.render('new');
})



//編輯特定資料
router.put('/:id' , (req , res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const {name , category , image , location , phone , google_map , rating , description} = req.body;

  //如果有必填空格沒填到
  if (!name || !category || !image || !location || !phone || !rating) {
    const restaurant = req.body;
    let errors = [];
    errors.push({message : '請填入必填資訊'});
    return res.render('edit' , { id : _id , restaurant , errors })
  }
  //空格都正確填寫了
  return Restaurant.findOne({ _id , userId })
                   .then(restaurants => {
                      restaurants.name = name;
                      restaurants.category = category;
                      restaurants.image = image;
                      restaurants.location = location;
                      restaurants.phone = phone;
                      restaurants.google_map = google_map;
                      restaurants.rating = rating;
                      restaurants.description = description;
                      restaurants.userId = userId;
                      return restaurants.save();
                    })
                    .then(() => res.redirect(`/restaurants/${_id}`))
                    .catch(error => console.log(error))
})

//新增資料
router.post('/' , (req , res) => {
  const {name , category , image , location , phone , google_map , rating , description} = req.body;
  const userId = req.user._id;


  if (!name || !category || !image || !location || !phone || !rating) {
    const restaurant = req.body;
    let errors = [];
    errors.push({message : '請填入必填資訊'});
    return res.render('new' , { restaurant , errors })
  }

  return Restaurant.create(
    {name , category , image , location , phone , google_map , rating , description , userId})
                   .then(() => res.redirect('/'))
                   .catch(error => console.log(error))
})

//get編輯頁面
router.get('/:id/edit' , (req , res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  return Restaurant.findOne({ _id , userId })
                   .lean()
                   .then(restaurants => res.render('edit' , { restaurant : restaurants }))
                   .catch(error => console.log(error))
})


//show特定頁面
router.get('/:id' , (req , res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Restaurant.findOne({ _id , userId })
                   .lean()
                   .then(restaurants => res.render('show' , {restaurant : restaurants}))
                   .catch(error => console.log(error))
});


//刪除特定資料
router.delete('/:id' , (req , res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  return Restaurant.findOne({ _id , userId })
                   .then(restaurants => restaurants.remove())
                   .then(() => res.redirect('/'))
                   .catch(error => console.log(error))
})

module.exports = router;