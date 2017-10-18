require('./test_helper')
const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('GET /api/v1/meals', function() {
  it('returns the meals in the database and a 200 code', function(done) {
    this.request.get('/api/v1/meals', (error, response) => {
      if (error) { done(error); }
      assert.equal(response.statusCode, 200);
      assert.include(response.body, "Breakfast")
      assert.include(response.body, "Lunch")
      done();
    });
  });
})
