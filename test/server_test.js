const assert = require('chai').assert
const app = require('../lib/server')
const request = require('request')

describe('Server', function(){
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
