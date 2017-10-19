const assert = require('chai').assert;
const pry = require('pryjs');
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Meal = require('../lib/models/meal')

describe('Meal model', function () {
  describe('getAll', function () {
    it('gets all meals from the database', function() {
      Meal.getAll()
      .then(function(meals) {
        assert.include(meals.rows[0].name, "Breakfast")
        assert.include(meals.rows[1].name, "Dinner")
        assert.include(meals.rows[2].name, "Snack")
        assert.include(meals.rows[3].name, "Lunch")
      })
    })
  })

  describe('find', function() {
    it('gets one meal from the database', function() {
      Meal.find(1)
      .then(function(meals) {
        assert.include(meals.rows[0].name, "Breakfast")
      })
    })
  })
})
