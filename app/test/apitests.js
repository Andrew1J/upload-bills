const request = require('supertest');
const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;

describe('Medical bill API', () => {
  let createdBillId;

  describe('POST /items', () => {
    it('creates a new medical bill', (done) => {
      const newBill = {
        patientName: 'John Doe',
        patientAddress: '123 Main St, Anytown USA',
        hospitalName: 'Anytown Hospital',
        dateOfService: '2022-02-14',
        billAmount: 100.00,
      };

      request(app)
        .post('/items')
        .send(newBill)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          // Assert that the response body contains the expected properties
          expect(res.body.patientName).to.equal(newBill.patientName);
          expect(res.body.patientAddress).to.equal(newBill.patientAddress);
          expect(res.body.hospitalName).to.equal(newBill.hospitalName);
          expect(res.body.dateOfService).to.equal(newBill.dateOfService);
          expect(res.body.billAmount).to.equal(newBill.billAmount);

          done();
        });
    });
  });

  describe('GET /items', () => {
    it('returns a list of medical bills', (done) => {
      request(app)
        .get('/items')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          // Assert that the response body is an array and contains the expected properties
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('patientName');
          expect(res.body[0]).to.have.property('patientAddress');
          expect(res.body[0]).to.have.property('hospitalName');
          expect(res.body[0]).to.have.property('dateOfService');
          expect(res.body[0]).to.have.property('billAmount');

          done();
        });
    });
  });
});