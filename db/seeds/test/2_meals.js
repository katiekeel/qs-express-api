exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE TABLE meals CASCADE')
    .then(function(){
      return Promise.all([
        knex.raw(
          'INSERT INTO meals (name, created_at) VALUES (?, ?)',
          ["Breakfast", new Date]
        ),
        knex.raw(
          'INSERT INTO meals (name, created_at) VALUES (?, ?)',
          ["Snack", new Date]
        ),
        knex.raw(
          'INSERT INTO meals (name, created_at) VALUES (?, ?)',
          ["Lunch", new Date]
        ),
        knex.raw(
          'INSERT INTO meals (name, created_at) VALUES (?, ?)',
          ["Dinner", new Date]
        )
      ])
    })
};
