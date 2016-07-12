import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, minlength: 2 },
  money: { type: Number, required: true, min: 1000 },
  apt: { type: mongoose.Schema.ObjectId, ref: 'Apartment' },
  complaints: { type: Number, min: 0, max: 3 },
});


module.exports = mongoose.model('Renter', schema);
