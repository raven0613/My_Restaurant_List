if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const db = require('../../config/mongoose');
const bcrypt = require('bcryptjs');


const Restaurant = require('../Restaurants');
const User = require('../../models/users')

const restaurantJson = require('../../public/restaurant.json');


const SEED_USERS = [{
  name : 'user1',
  email : 'user1@example.com',
  password : '12345678'
} ,{
  name : 'user2',
  email : 'user2@example.com',
  password : '12345678'
}]



db.on('open' , () => {

  for(let i = 0; i < SEED_USERS.length; i++){

    User.findOne({ email : SEED_USERS[i].email })
        .then(user => {
          //如果 user 資料已存在 就發出提示且不新增user 直接新增6筆餐廳資料平分給 user1 和 user2
          if (user) {
            console.log(`email: ${user.email} 已註冊過`)
            return User
              .findOne({ email : SEED_USERS[i].email })
              .then(user => {
                const userId = user._id;
                return Promise.all(Array.from(
                  { length: 3 } , (value , j) => 
                    Restaurant.create(
                      { name : i < 1? restaurantJson.results[j].name : restaurantJson.results[j + 3].name , 
                        image : i < 1? restaurantJson.results[j].image : restaurantJson.results[j + 3].image ,
                        category : i < 1? restaurantJson.results[j].category : restaurantJson.results[j + 3].category ,
                        location : i < 1? restaurantJson.results[j].location : restaurantJson.results[j + 3].location ,
                        phone : i < 1? restaurantJson.results[j].phone : restaurantJson.results[j + 3].phone ,
                        google_map : i < 1? restaurantJson.results[j].google_map : restaurantJson.results[j + 3].google_map ,
                        rating : i < 1? restaurantJson.results[j].rating : restaurantJson.results[j + 3].rating ,
                        description : i < 1? restaurantJson.results[j].description : restaurantJson.results[j + 3].description ,
                        userId
                      }
                    )
                ))  
              })
              .then(() => {
                console.log('done');
                process.exit();
              })
              .catch(err => console.log(err))
          }
          
          //如果 user 資料不存在 就新增 user1 和 user2  並新增6筆餐廳資料平分給 user1 和 user2
          if (!user) {
            return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(SEED_USERS[i].password , salt))
            .then(hash =>   
              User.create({
                name : SEED_USERS[i].name,
                email : SEED_USERS[i].email,
                password : hash 
              }))
            .then(user => {
              const userId = user._id;
              return Promise.all(Array.from(
                { length: 3 } , (value , j) => 
                  Restaurant.create(
                    { name : i < 1? restaurantJson.results[j].name : restaurantJson.results[j + 3].name , 
                      image : i < 1? restaurantJson.results[j].image : restaurantJson.results[j + 3].image ,
                      category : i < 1? restaurantJson.results[j].category : restaurantJson.results[j + 3].category ,
                      location : i < 1? restaurantJson.results[j].location : restaurantJson.results[j + 3].location ,
                      phone : i < 1? restaurantJson.results[j].phone : restaurantJson.results[j + 3].phone ,
                      google_map : i < 1? restaurantJson.results[j].google_map : restaurantJson.results[j + 3].google_map ,
                      rating : i < 1? restaurantJson.results[j].rating : restaurantJson.results[j + 3].rating ,
                      description : i < 1? restaurantJson.results[j].description : restaurantJson.results[j + 3].description ,
                      userId
                    }
                  )
              ))  
            })
            .then(() => {
              console.log('done');
              process.exit();
            })
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))



    
  }
})