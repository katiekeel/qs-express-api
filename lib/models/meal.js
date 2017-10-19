const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const getAll = () => {
  database.raw(
      "SELECT meals.*, json_agg(foods) AS foods FROM meals JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id GROUP BY meals.id;"
    )
}


module.exports = {
  getAll
}
