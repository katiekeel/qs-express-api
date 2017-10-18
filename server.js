const pry = require('pryjs')
const express = require('express')
const app = express()
const foods = require('./lib/models/foods')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 9876)
app.locals.title = 'QS Express Api'

app.get('/', function(request, response) {
  response.send('QS Express API')
})

app.get('/api/v1/foods', function(request, response) {
  foods.all()
  .then(function(food){
    if(food.rowCount == 0) {
      return response.sendStatus(204)
    }
    response.json(food.rows)
  })
})

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
