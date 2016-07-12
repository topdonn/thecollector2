/* eslint-disable no-unused-expressions, no-use-before-define, no-underscore-dangle, max-len, func-names */
import Renter from '../models/renter';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true, validate: { validator: duplicateApartmentNameValidator } },
  sqft: { type: Number, required: true, min: 500, max: 2500 },
  rooms: { type: Number, required: true, min: 1, max: 4 },
  rent: { type: Number, required: true, min: 1000 },
  deposit: { type: Number, required: true, min: 50 },
  rentDueDay: { type: Number, required: true, min: 1, max: 30 },
  lateFee: { type: Number, required: true, min: 10 },
  totalRent: { type: Number, required: true, default: 0, min: 0 },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter' },
});

function duplicateApartmentNameValidator(name, cb) {
  this.model('Apartment').find({ name }, (err, apartments) => {
    cb(!apartments.length);
  });
}

schema.methods.lease = function (renterid, cb) {
  this.model('Apartment').findByIdAndUpdate(this._id, { $set: { renter: renterid } }, { new: true }).populate('renter')
  .exec((err, apartment) => {
    Renter.findByIdAndUpdate(renterid, { $set: { apt: this._id } }, { new: true }).populate('apt').exec((err2, renter) => {
      cb({ apartment, renter });
    });
  });
};

module.exports = mongoose.model('Apartment', schema);
