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
    this.port = 3000
    this.server = app.listen(this.port, function(err, result){
      if(err){ return done(err) }
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })
  var formerId;
  beforeEach((done) => {
    var food = {
      name: 'Carrot Cake',
      calories: '450'
    }
    foods.create(food)
    .then(() => {
      database.raw("SELECT id FROM foods WHERE name = 'Carrot Cake';")
      .then((data) => {
        formerId = data.rows[0].id
        done()
      })
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
      let id = 10000;
      this.request.get('/api/v1/foods/' + id, function(error, response){
        if(error){done(error)}
        assert.equal(response.statusCode, 404)
      })
      done()
    })
    it('should return a json object of a food with registered id', function(done){
      var food1 = {id: formerId, name: "Carrot Cake", calories: 450};
      this.request.get('/api/v1/foods/' + formerId, function(error, response){
        if(error){done(error)}
        let parsedFood = JSON.parse(response.body)
        assert.deepEqual(parsedFood, food1)
      })
      done()
    })
  });
  describe('POST /api/v1/foods', function(){
    beforeEach((done) => {
      database.raw("DELETE FROM foods WHERE name = 'Carrot Cake';")
      .then(() => done())
    })
    afterEach((done) => {
      database.raw("DELETE FROM foods WHERE name = 'Carrot Cake';")
      .then(() => done())
    })
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
      })
      done()
    })
  });
  describe('PATCH', function(){
    beforeEach((done) => {
      var food = {
          name: 'Carrot Cake',
          calories: '450'
        }
      foods.create(food)
      .then(() => done())
    })
    afterEach((done) => {
      database.raw("DELETE FROM foods WHERE calories = 299;")
      .then(() => done())
    })
    it('should be able to edit foods', function(done){
      var foodAmmendment = {
        food: {
          name: 'Carrot Cake n CreamCheese',
          calories: 299
        }
      }
      database.raw('SELECT MAX(id) FROM foods;')
      .then((data) => {
        var id = data.rows[0].max;
        this.request.patch('/api/v1/foods/'+id, {form: foodAmmendment}, function(error, response){
          if(error){done(error)}
          var food = {id: id, name: "Carrot Cake n CreamCheese", calories: 299};
          patchedResponse = JSON.parse(response.body)
          assert.hasAllDeepKeys(patchedResponse, ['id', 'name', 'calories'])
          assert.deepEqual(patchedResponse, food)
          assert.isTrue(patchedResponse.name.includes('CreamCheese'))
        })
        done()
      })
    })
  })
  describe('DELETE', function(){
    it('Deletes a food item from the db given an id', function(done){
      database.raw('SELECT MAX(id) FROM foods;')
        .then((data) => {
          var id = data.rows[0].max;
          this.request.delete('api/v1/foods/' + id, function(error, response){
            if(error){done(error)}
            let parsedFood = JSON.parse(response.body)
            assert.hasAllDeepKeys(parsedFood, ['id', 'name', 'calories'])
            assert.equal(parsedFood.id, id)
            assert.equal(response.statusCode, 200)
            done()
          })
        })
    })
  })
});
