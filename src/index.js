const cardValidator = require('card-validator')

const card = require('./card')({ cardValidator })
const endpoints = require('./endpoints')()
const entity = require('./entity')()
const fac = require('./fac')({ cardValidator })
const isValid = require('./isValid')()
const logger = require('./logger')()
const mongo = require('./mongo')()
const discord = require('./discord')

module.exports = {
  card,
  endpoints,
  entity,
  fac,
  isValid,
  logger,
  mongo,
  discord
}
