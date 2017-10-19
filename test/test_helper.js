const assert = require('chai').assert
const app = require('../server')
const request = require('request')

before(function(done){
  this.port = 3001
  this.server = app.listen(this.port, function(err, result){
    if(err) { return done(err) }
    done()
  })
  this.request = request.defaults({
    baseUrl: 'http://localhost:3001'
  })
})

after(function(done){
  this.server.close()
  done()
})
