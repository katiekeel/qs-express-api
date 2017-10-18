exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('')
    .then(function(){
      return Promise.all([
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [1, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [1, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [2, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [2, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [3, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [3, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [4, (Math.floor(Math.random() * 10) + 1), new Date]
        ),
        knex.raw(
          'INSERT INTO meal_foods (meal_id, food_id, created_at) VALUES (?, ?, ?)',
          [4, (Math.floor(Math.random() * 10) + 1), new Date]
        )
      ]);
    });
};
