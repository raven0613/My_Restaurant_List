const express = require('express');
const Restaurant = require('../../models/Restaurants');
const router = express.Router();

//show頁面
router.get('/:id' , (req , res) => {
  const id = req.params.id;

  Restaurant.findById(id)
            .lean()
            .then(restaurants => res.render('show' , {restaurant : restaurants}))
            .catch(error => console.log(error))
 });


module.exports = router;