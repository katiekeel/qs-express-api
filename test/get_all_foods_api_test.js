require('./test_helper')
const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('API', function() {
  it('should return a 204 no content if there are no foods in the database', function(done) {
    this.request.get('/api/v1/foods', function(error, response) {
      if (error) { done(error) }
      assert.equal(response.statusCode, 204)
      done()
    })
  })

  describe('GET /api/v1/foods', function() {
    beforeEach(function() {
      // insert things into test db here
    })
  })
});
