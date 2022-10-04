const requiredParam = require('../entity/requiredParam')
const isValid = require('./isValid')
const testNumberArr = require('./testNumbers')
const padNumber = require('./padNumber')

const card = ({
  cardValidator = requiredParam('cardValidator')
}) => {
  return Object.freeze({
    isValid: isValid({ cardValidator, testNumbers: testNumberArr }),
    padNumber
  })
}

module.exports = card
