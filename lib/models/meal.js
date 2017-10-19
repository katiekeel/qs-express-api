const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const getAll = () => {
  return database.raw(
      "SELECT meals.id, meals.name, json_agg(foods) AS foods FROM meals JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id GROUP BY meals.id;"
    )
}


module.exports = {
  getAll
}
