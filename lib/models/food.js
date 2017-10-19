const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const find = (id) => {
  return database.raw(
    `SELECT id, name, calories FROM foods WHERE id = ${id};`
  )
};

const create = (food) => {
  let name = food.name;
  let calories = food.calories;
  let tempDate = new Date
  let date = tempDate.toString()
  date = date.substring(0, 24)
  return database.raw(
    `INSERT INTO foods (name, calories, created_at) VALUES ('${name}', '${calories}', '${date}') RETURNING id, name, calories`
  )
};

const destroy = (id) => {
  return database.raw(`DELETE FROM foods WHERE id = ${id} RETURNING id, name, calories;`)
}

let destroyAll = () => {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  find, create, destroy, destroyAll
}
