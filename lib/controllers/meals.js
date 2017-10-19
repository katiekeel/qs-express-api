const Meal = require('../models/meal.js')
const pry = require('pryjs')

const getMeals = (request, response, next) => {
  Meal.getAll()
  .then(function(food) {
    if(food.rowCount == 0){return response.sendStatus(404)}
    response.json(food.rows)
  })
}

const findMeal = (request, response, next) => {
  let id = request.params.id;
  Meal.find(id)
  .then(function(meal) {
    if(meal.rowCount == 0){return response.sendStatus(404)}
    response.json(meal.rows[0])
  })
}

module.exports = {getMeals, findMeal}
