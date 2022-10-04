const requiredParam = require('../entity/requiredParam')
const isValid = require('./isValid')()
const getAuthorizeEndpointInit = require('./getAuthorizeEndpoint')
const makeGetPaymentType = require('./getPaymentType')

const fac = ({ cardValidator = requiredParam('cardValidator') }) => {
  return Object.freeze({
    getAuthorizeEndpoint: getAuthorizeEndpointInit({ cardValidator }).getAuthorizeEndpoint,
    getPaymentType: makeGetPaymentType({ cardValidator }).getPaymentType,
    isValid
  })
}

module.exports = fac
