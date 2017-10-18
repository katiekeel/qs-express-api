exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE foods CASCADE')
    .then(function(){
      return Promise.all([
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Banana", 105, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Apple", 180, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Kiwi", 42, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Zucchini", 33, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Spinach", 100, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Chicken Burrito", 860, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Pork Tenderloin Sandwich", 450, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Fries", 300, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Vanilla Ice Cream", 250, new Date]
        ),
        knex.raw(
          'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
          ["Pizza", 750, new Date]
        )
      ])
    })
};
