const assert = require('chai').assert
const app = require('../server')
const request = require('request')

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
