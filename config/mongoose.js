const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://alpha:camp@cluster0.ykx0l.mongodb.net/resaurant-list?retryWrites=true&w=majority' , { useNewUrlParser: true , useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error' , () => {
  console.log('mongoDB error');
})

db.once('open' , () => {
  console.log('mongoDB connected');
})

module.exports = db;