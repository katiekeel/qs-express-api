require('./test_helper')
const assert = require('chai').assert
const app = require('../server')
const request = require('request')

describe('Server', function(){
  it('should exist', function(done){
    assert(app)
    done()
  })

  describe('GET /', function() {
    it('should return a 200', function(done) {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
})
