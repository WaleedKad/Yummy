const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  address: {type: String, required: true},
  zipCode: {type: String, required: true} 
  

});

module.exports = mongoose.model('User', usersSchema);
