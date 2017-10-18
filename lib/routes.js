const app = require('../server')

app.get('/', function(request, response) {
  response.send('QS Express API')
})
