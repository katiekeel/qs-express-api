const Meal = require('../models/meal.js')
const pry = require('pryjs')

const getMeals = (request, response, next) => {
  Meal.getAll()
  .then(function(food) {
    if(food.rowCount == 0){return response.sendStatus(404)}
    response.json(food.rows)
  })
}

module.exports = {getMeals}
