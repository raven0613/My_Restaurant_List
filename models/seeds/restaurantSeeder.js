const db = require('../../config/mongoose');
const Restaurant = require('../Restaurants');
const restaurantJson = require('../../public/restaurant.json');

db.on('open' , () => {
  for(let i = 0; i < restaurantJson.results.length; i++){
    Restaurant.create(
      { name : restaurantJson.results[i].name, 
        image : restaurantJson.results[i].image,
        category : restaurantJson.results[i].category,
        location : restaurantJson.results[i].location,
        phone : restaurantJson.results[i].phone,
        google_map : restaurantJson.results[i].google_map,
        rating : restaurantJson.results[i].rating,
        description : restaurantJson.results[i].description
      }
    )
  }
  console.log('done');
})