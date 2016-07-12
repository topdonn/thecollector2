/* eslint-disable no-unused-expressions, no-unused-vars, func-names, prefer-arrow-callback */
const expect = require('chai').expect;
const sinon = require('sinon');
const Renter = require('../../dst/models/renter');


describe('Renter', () => {
  beforeEach(() => {
    // sinon.stub(Renter, 'find').yields(null, []);
  });
  afterEach(() => {
     // Dog.find.restore();
  });
  describe('constructor', () => {
    it('should create a renter object', (done) => {
      const r = new Renter({ name: 'CharlieFiddler', money: 2000, complaints: 0 });
      r.validate(err => {
        expect(err).to.be.undefined;
        expect(r.name).to.equal('CharlieFiddler');
        expect(r.money).to.equal(2000);
        expect(r.complaints).to.equal(0);
        done();
      });
    });
    it('should not create a renter due to insufficient funds', (done) => {
      const r = new Renter({ name: 'CharlieFiddler', money: 500, complaints: 0 });
      r.validate(err => {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});
