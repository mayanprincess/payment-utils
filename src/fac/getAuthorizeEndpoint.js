const requiredParam = require('../entity/requiredParam')

const getAuthorizeEndpointInit = ({ cardValidator = requiredParam('cardValidator') }) => {
  const getAuthorizeEndpoint = ({ cardNumber = requiredParam('cardNumber') }) => {
    let endpoint
    const cardType = cardValidator.number(cardNumber).card.type
    switch (cardType) {
      case 'visa':
        endpoint = 'Authorize3DS'
        break
      case 'mastercard':
        endpoint = 'Authorize3DS'
        break
      default:
        endpoint = 'Authorize'
        break
    }
    return endpoint
  }
  return Object.freeze({
    getAuthorizeEndpoint
  })
}

module.exports = getAuthorizeEndpointInit
