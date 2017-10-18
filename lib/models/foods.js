const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const find = (id) => {
  return database.raw(
    `SELECT * FROM foods WHERE id = ${id};`
  )
};

const getAll = () => {
  return database.raw(
    "SELECT * FROM foods ORDER BY foods.id;"
  )
}


module.exports = {
  find,
  getAll
}
