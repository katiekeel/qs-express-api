const assert = require('chai').assert
const app = require('../lib/server')
const request = require('request')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('API', function() {
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err, result){
      if(err) { return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(function(done){
    this.server.close()
    done()
  })

  it('should return a 204 no content if there are no foods in the database', function(done) {
    this.request.get('/api/v1/foods', function(error, response) {
      if (error) { done(error) }
      assert.equal(response.statusCode, 204)
      done()
    })
  })

  describe('GET /api/v1/foods', function() {
    beforeEach(function() {
      // insert things into test db here or above?
    })


  })
});
