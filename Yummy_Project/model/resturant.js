const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  img: { type: String, required: true },
  alt: { type: String, required: true },
  name: { type: String, required: true },
  cuisine:{type: String, required: true},
  
});

module.exports = mongoose.model('Restaurant', restaurantSchema);