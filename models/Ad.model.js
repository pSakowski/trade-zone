const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  seller: { type: String, ref: 'User', required: true }
});

module.exports = mongoose.model('Ad', adSchema);
