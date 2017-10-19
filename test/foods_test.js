const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const pry = require('pryjs')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const foods = require('../lib/models/food')

describe('Foods', function(){
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err, result){
      if(err){ return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })
  after(function(){
    this.server.close()
  })

  describe('GET /api/v1/foods/:id', function(){
    it('should exist', function(){
      assert(app)
    })
    it('should return a 404 for an unregistered id', function(done){
      var id = 100;
      this.request.get('/api/v1/foods/' + id, function(error, response){
        if(error){done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })
    it('should return a json object of a food with registered id', function(done){
      var id = 1;
      var food1 = {id: 1, name: "Banana", calories: 105};
      this.request.get('/api/v1/foods/' + id, function(error, response){
        if(error){done(error)}
        let parsedFood = JSON.parse(response.body)
        assert.deepEqual(parsedFood, food1)
        done()
      })
    })
  });
  describe('POST /api/v1/foods', function(){
    it('should be able to post a new food', function(done){
      var foodDetails = {
        food: {
          name: 'Carrot Cake',
          calories: '450'
        }
      }
      this.request.post('/api/v1/foods', {form: foodDetails}, function(error, response){
        if(error) { done(error) }
        var parsedFood = JSON.parse(response.body);
        assert.equal('Carrot Cake', parsedFood.name)
        assert.equal(450, parsedFood.calories)
        assert.equal(response.statusCode, 201)
        done()
      })
    })
  });
});
