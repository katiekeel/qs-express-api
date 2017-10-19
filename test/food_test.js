var assert = require('chai').assert;
var pry = require('pryjs');
var environment = process.env.NODE_ENV || 'test'
var configuration = require('../knexfile')[environment]
var database = require('knex')(configuration)
const Food = require('../lib/models/food')

describe('Food Model -- Find', function(){
  it('can find an existing food given id', function(){
    var foodItem;
    var id = 1
    var food1 = {id: 1, name: 'Banana', calories: 105}
    Food.find(id)
      .then(function(food){
        foodItem = food.rows[0]
        assert.deepEqual(foodItem, food1)
      })
  })
});
describe('Food Model -- Create', function(){
  afterEach((done) => {
    database.raw("DELETE FROM foods WHERE name = 'Carrot Cake';")
    .then(() => done())
  })
  it('can create a new food item', function(done){
    database.raw('SELECT MAX(id) from foods;')
      .then((data) => {
        var id = data.rows[0].max;
        var newId = id + 3
        var newFood = {id: newId, name: 'Carrot Cake', calories: 299};
        Food.create(newFood)
          .then(function(food){
            let returnFood = food.rows[0]
            assert.deepEqual(returnFood, newFood)
            done()
          })
      })
  })
});
describe('Food Model -- Update', function(){
  var formerId;
  beforeEach((done) => {
    var food = {
        name: 'Carrot Cake',
        calories: '450'
      }
    Food.create(food)
    .then(() => {
      database.raw("SELECT id FROM foods WHERE name = 'Carrot Cake';")
        .then((data) => {
          formerId = data.rows[0].id
          done()
        })
    })
  })
  afterEach((done) => {
    database.raw("SELECT id FROM foods WHERE name ='Coffee Cake';")
      .then((data) => {
        var editedFoodId = data.rows[0].id;
        var previousDeets = {name: 'Carrot Cake', calories: 450};
        Food.update(editedFoodId, previousDeets)
          .then(() => done())
      })
  })
  it('can edit and update a food with correct properties', function(done){
    database.raw(`SELECT id, name, calories FROM foods WHERE id=${formerId};`)
      .then((data) => {
        var previousFoodDetails = data.rows[0];
        assert.equal(previousFoodDetails.name, 'Carrot Cake')
        assert.equal(previousFoodDetails.calories, 450)
        formerId = previousFoodDetails.id;
        Food.update(formerId, {name: 'Coffee Cake', calories: 199})
          .then((data) => {
            let updatedFood = {id: formerId, name: 'Coffee Cake', calories: 199}
            let editedFood = data.rows[0];
            assert.equal(editedFood.id, formerId)
            assert.deepEqual(editedFood, updatedFood)
          })
          done()
      })
  })
});
