const Meal = require('../models/meal.js')

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

const postMealFood = (request, response, next) => {
  let mealId = request.params.meal_id;
  let foodId = request.params.food_id;
  Meal.createFood(mealId, foodId)
  .then(function(meal) {
    if(meal.rowCount == 0){return response.sendStatus(404)}
    response.json(meal)
  })
}

const deleteMealFood = (request, response, next) => {
  let mealId = request.params.meal_id;
  let foodId = request.params.food_id;
  Meal.removeFood(mealId, foodId)
  .then(function(meal) {
    if(meal.rowCount == 0){return response.sendStatus(404)}
    response.json(meal)
  })
}

module.exports = {getMeals, findMeal, postMealFood, deleteMealFood}
