const pry = require('pryjs')
const express = require('express')
const app = express()


app.set('port', process.env.PORT || 9876)
app.locals.title = 'QS Express Api'

if (!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}

module.exports = app
