require('./test_helper')
const assert = require('chai').assert
const app = require('../server')
const request = require('request')
const pry = require('pryjs')
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const foods = require('../lib/models/food')

describe('Meals', function() {
  describe('GET /api/v1/meals', function() {
    it('returns the meals in the database and a 200 code', function(done) {
      this.request.get('/api/v1/meals', function(error, response) {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200)
        assert.include(response.body, "Breakfast")
        assert.include(response.body, "Dinner")
        done()
      })
    })
  })

  describe('GET /api/v1/meals/:id/foods', function() {
    it('returns the meal and a 200 code', function(done) {
      this.request.get('/api/v1/meals/1/foods', function(error, response) {
        if (error) { done(error); }
        assert.include(response.body, "Breakfast")
        assert.equal(response.statusCode, 200)
        done()
      })
    })

    it('returns a 404 for a bad id', function(done) {
      this.request.get('/api/v1/meals/43/foods', function(error, response) {
        if (error) { done(error); }
        assert.equal(response.statusCode, 404)
        done()
      })
    })
  })

  describe('POST /api/v1/meals/:id/foods/:id', function () {
    it('creates a new entry in the meal foods table', function(done) {
      this.request.post('/api/v1/meals/1/foods/2', function(error, response) {
        if (error) { done(error) }
        assert.equal(response.statusCode, 200)
        done()
      })
    })
  })
})
