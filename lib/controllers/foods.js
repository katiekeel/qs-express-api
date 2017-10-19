const Food = require('../models/food.js')
const pry = require('pryjs')

const postFood = (request, response, next) => {
  let params = request.body;
  if(!params.food) {
    return response.status(422).send({error: "No food properties provided!"})
  }
  checkParams(params.food)
  Food.create(params.food)
    .then(function(data){
      response.status(201).json(data.rows[0])
  })
}

function checkParams(params, done){
  if(!params.name){
    return response.status(422).send({error: "Missing name property"})
  }else if(!params.calories){
    return response.status(422).send({error: "Missing name property"})
  }
}

const deleteFood = (request, response, next) => {
  let id = request.params.id;
  Food.destroy(id)
    .then((data) => {
      return response.status(200).send(data.rows[0])
    })
}

module.exports = {
  postFood, deleteFood
}
