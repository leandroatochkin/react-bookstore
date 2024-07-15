const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  country: { type: String, default: 'Argentina' },
  picture: { type: String },
  terms: { type: Boolean, required: true },
  purchases: { type: Array, default: [] },
  settings: { type: Array, default: [] },
});

module.exports = mongoose.model('User', userSchema);
