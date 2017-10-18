const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const find = (id) => {
  return database.raw(
    `SELECT id, name, calories FROM foods WHERE id = ${id};`
  )
};


module.exports = {
  find
}
