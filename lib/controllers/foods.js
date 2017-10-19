const Food = require('../models/food.js')
const pry = require('pryjs')

const findFood = (request, response, next) => {
  var id = request.params.id;
  Food.find(id)
  .then(function(food){
    if(food.rowCount == 0){return response.sendStatus(404)}
    response.json(food.rows[0])
  })
};

const postFood = (request, response, next) => {
  let params = request.body;
  ifParams(params)
  checkParams(params.food)
  Food.create(params.food)
    .then((data)=> { response.status(201).json(data.rows[0]) })
};

const patchFood = (request, response, next) => {
  let params = request.body;
  let id = request.params.id
  ifParams(params)
  checkParams(params.food)
  Food.update(id, params.food)
    .then(function(data){  response.status(202).json(data.rows[0]) })
};

function checkParams(params, done){
  if(!params.name){
    return response.status(422).send({error: "Missing name property"})
  }else if(!params.calories){
    return response.status(422).send({error: "Missing calorie property"})
  }
};

function ifParams(params){
  if(!params.food) {
    return response.status(422).send({error: "No food properties provided!"})
  }
};

const deleteFood = (request, response, next) => {
  let id = request.params.id;
  Food.destroy(id)
    .then((data) => {
      return response.status(200).send(data.rows[0])
    })
};

module.exports = {
  findFood, postFood, patchFood, deleteFood
}
