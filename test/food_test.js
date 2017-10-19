var assert = require('chai').assert;
var pry = require('pryjs');
var environment = process.env.NODE_ENV || 'development'
var configuration = require('../knexfile')[environment]
var database = require('knex')(configuration)
const Food = require('../lib/models/food')

describe('Food Model', function(){
  it('can find an existing food given id', function(){
    id = 1
    food1 = {id: 1, name: 'Banana', calories: 105}
    var food = Food.find(id)
    assert(food)
    assert.deepEqual(food, food1)
  })
})
