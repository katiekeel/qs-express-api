require('./test_helper')
const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('GET /api/v1/foods', function() {
  it('returns the foods in the database and a 201 code', function(done) {
    this.request.get('/api/v1/foods', (error, response) => {
      if (error) { done(error); }
      assert.equal(response.statusCode, 200);
      assert.include(response.body, "Kiwi")
      assert.include(response.body, "Pizza")
      done();
    });
  });
})
