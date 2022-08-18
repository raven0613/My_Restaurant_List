const mongoose = require('mongoose');

const User = require('./users');
const Schema = mongoose.Schema;


const resaurantSchema = new Schema({
  name : { type: String , required: true },
  image : { type: String , required: true },
  category : { type: String , required: true },
  location : { type: String , required: true },
  phone : { type: String , required: true },
  google_map : { type: String , required: true },
  rating : { type: String , required: true },
  description : { type: String , required: false },
  
});

module.exports = mongoose.model('Restaurant' , resaurantSchema);

