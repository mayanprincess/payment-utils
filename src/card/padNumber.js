const requiredParam = require('../entity/requiredParam')

const padNumber = ({ number = requiredParam('number') }) => number.substring(number.length - 4, number.length)

module.exports = padNumber
