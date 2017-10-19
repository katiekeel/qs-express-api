const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const find = (id) => {
  return database.raw(
    `SELECT id, name, calories FROM foods WHERE id = ${id};`
  )
};

const all = () => {
  return database.raw(
    "SELECT foods.id, foods.name, foods.calories FROM foods ORDER BY foods.id;"
  )
}

const create = (food) => {
  let name = food.name;
  let calories = food.calories;
  let date = createDate();
  return database.raw(
    `INSERT INTO foods (name, calories, created_at) VALUES ('${name}', '${calories}', '${date}') RETURNING id, name, calories`
  )
};

const update = (id, food) => {
  let name = food.name;
  let calories = food.calories;
  let updatedAt = createDate()
  return database.raw(
    `UPDATE foods SET name='${name}', calories='${calories}', updated_at='${updatedAt}' WHERE id=${id} RETURNING id, name, calories;`
  )
}

function createDate(){
  let tempDate = new Date
  let date = tempDate.toString()
  return date.substring(0, 24)
}

const destroy = (id) => {
  return database.raw(`DELETE FROM foods WHERE id = ${id} RETURNING id, name, calories;`)
}

let destroyAll = () => {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

module.exports = {
  find, all, create, update, destroy, destroyAll
}
