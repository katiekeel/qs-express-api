const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const getAll = () => {
  return database.raw(
      "SELECT meals.id, meals.name, json_agg(foods) AS foods FROM meals JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id GROUP BY meals.id;"
    )
}

const find = (id) => {
  return database.raw(
    `SELECT meals.id, meals.name, json_agg(foods) AS foods FROM meals JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id WHERE meals.id = ${id} GROUP BY meals.id;`
  )
}

const createFood = (mealId, foodId) => {
  let date = createDate();
  return database.raw(
    `INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES ('${mealId}', '${foodId}', '${date}') RETURNING meal_id, food_id;`
  )
}

function createDate(){
  let tempDate = new Date
  let date = tempDate.toString()
  return date.substring(0, 24)
}

module.exports = {
  getAll,
  find,
  createFood
}
