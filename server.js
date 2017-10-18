var pry = require('pryjs')
var express = require('express')
var app = express()
var foods = require('./lib/models/foods')
app.set('port', process.env.PORT || 9876)
// app.locals.title = 'Secret Box'

app.get('/', function(request, response) {
  response.send('It\'s a secret to everyone.')
})

app.get('/api/v1/foods/:id', function(request, response) {
  var id = request.params.id;
  foods.find(id)
  .then(function(food){
    if(food.rowCount == 0){return response.sendStatus(404)}
    response.json(food.rows[0])
  })
})

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
