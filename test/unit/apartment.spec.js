/* eslint-disable no-unused-expressions, no-unused-vars, func-names, prefer-arrow-callback, max-len */
const expect = require('chai').expect;
const sinon = require('sinon');
const Apartment = require('../../dst/models/apartment');
const Renter = require('../../dst/models/renter');

describe('Apartment', () => {
  beforeEach(() => {
    sinon.stub(Apartment, 'find').yields(null, []);
    sinon.stub(Apartment, 'findByIdAndUpdate').yields(null, null);
    sinon.stub(Renter, 'findByIdAndUpdate').yields(null, null);
  });
  afterEach(() => {
    Apartment.find.restore();
    Apartment.findByIdAndUpdate.restore();
    Renter.findByIdAndUpdate.restore();
  });
  describe('constructor', () => {
    it('should create a apartment object', (done) => {
      const r = new Apartment({ name: 'c1', sqft: 2000, rooms: 1, rent: 1000, deposit: 100, rentDueDay: 5, lateFee: 10 });
      r.validate(err => {
        expect(err).to.be.undefined;
        expect(r.name).to.equal('c1');
        expect(r.sqft).to.equal(2000);
        expect(r.rooms).to.equal(1);
        done();
      });
    });
    it('should not create a apartment due to duplicate apartment name', (done) => {
      Apartment.find.yields(null, [{ name: 'c1' }]);
      const r = new Apartment({ name: 'c1', sqft: 2000, rooms: 1, rent: 1000, deposit: 100, rentDueDay: 5, lateFee: 10 });
      r.validate(err => {
        expect(err).to.be.ok;
        sinon.assert.calledWith(Apartment.find, { name: 'c1' });
        done();
      });
    });
    it('should lease an apartment to a specific renter', (done) => {
      Apartment.findByIdAndUpdate.yields(null, { name: 'c1', renter: { name: 'CharlieFiddler' } });
      Renter.findByIdAndUpdate.yields(null, { name: 'CharlieFiddler', apt: { name: 'c1' } });
      const r = new Apartment({ name: 'c1', sqft: 2000, rooms: 1, rent: 1000, deposit: 100, rentDueDay: 5, lateFee: 10 });
      r.lease(4342413, data => {
        sinon.assert.calledWith(Apartment.findByIdAndUpdate, { name: 'c1' });
        sinon.assert.calledWith(Renter.findByIdAndUpdate, { name: 'CharlieFiddler' });
        done();
      });
    });
  });
});
