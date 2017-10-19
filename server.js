const pry = require('pryjs')
const express = require('express')
const app = express()
const food = require('./lib/models/food')
const Foods = require('./lib/controllers/foods')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 9876)
app.locals.title = 'QS Express Api'

app.get('/', function(request, response) {
  response.send('QS Express API')
})

app.get('/api/v1/foods/:id', Foods.findFood);

app.post('/api/v1/foods', Foods.postFood);

app.delete('/api/v1/foods/:id', Foods.deleteFood);

app.patch('/api/v1/foods/:id', Foods.patchFood);

app.get('/api/v1/meals', function(request, response) {
  meals.all()
  .then(function(allMeals){
    if(allMeals.rowCount == 0) {
      return response.sendStatus(204)
    }
    response.json(allMeals.rows)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
