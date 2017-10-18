const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => {
  database.raw(
      "SELECT meals.id, meals.name, array_agg(foods.id, foods.calories) FROM meals INNER JOIN meal_foods ON meals.id = meal_foods.meal_id INNER JOIN foods ON foods.id = meal_foods.food_id GROUP BY meals.id,  meals.name;"
    )
}


module.exports = {
  all
}
