const mongoose = require('mongoose');

// 🔁 Reusable item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

// 🧾 Order schema
const orderSchema = new mongoose.Schema({
  items: {
    type: [itemSchema],
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // optional: use this if associating orders with users
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
