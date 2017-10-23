const express = require('express')
const app = express()
const food = require('./lib/models/food')
const Foods = require('./lib/controllers/foods')
const Meals = require('./lib/controllers/meals')
const bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, DELETE, OPTIONS")
  if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'QS Express Api'

app.get('/', function(request, response) {
  response.send('QS Express API')
})

app.get('/api/v1/foods', Foods.getFoods);

app.get('/api/v1/foods/:id', Foods.findFood);

app.post('/api/v1/foods', Foods.postFood);

app.delete('/api/v1/foods/:id', Foods.deleteFood);

app.patch('/api/v1/foods/:id', Foods.patchFood);

app.get('/api/v1/meals', Meals.getMeals);

app.get('/api/v1/meals/:id/foods', Meals.findMeal);

app.post('/api/v1/meals/:meal_id/foods/:food_id', Meals.postMealFood);

app.delete('/api/v1/meals/:meal_id/foods/:food_id', Meals.deleteMealFood);

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
