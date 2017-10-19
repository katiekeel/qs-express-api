const assert = require('chai').assert;
const pry = require('pryjs');
const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const Food = require('../lib/models/food')
