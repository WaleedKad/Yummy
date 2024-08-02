const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;