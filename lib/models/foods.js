const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const find = (id) => {
  return database.raw(
    `SELECT * FROM foods WHERE id = ${id};`
  )
};

const all = () => {
  return database.raw(
    "SELECT foods.id, foods.name, foods.calories FROM foods ORDER BY foods.id;"
  )
}


module.exports = {
  find,
  all
}
