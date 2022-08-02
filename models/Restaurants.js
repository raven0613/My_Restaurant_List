const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resaurantSchema = new Schema({
  id: { type: Number , required: true },
  name : { type: String , required: true },
  image : { type: String , required: true },
  category : { type: String , required: true },
  location : { type: String , required: true },
  phone : { type: String , required: true },
  google_map : { type: String , required: true },
  rating : { type: String , required: true },
  description : { type: String , required: false }
});

module.exports = mongoose.model('Restaurant' , resaurantSchema);

