const requiredParam = require('../entity/requiredParam')

const makeGetPaymentType = ({ cardValidator = requiredParam('cardValidator') }) => {
  const getPaymentType = ({ cardNumber = requiredParam('cardNumber') }) => {
    let type
    const cardType = cardValidator.number(cardNumber).card.type
    switch (cardType) {
      case 'visa':
        type = '3ds'
        break
      case 'mastercard':
        type = '3ds'
        break
      default:
        type = 'authorize'
        break
    }
    return type
  }
  return Object.freeze({
    getPaymentType
  })
}

module.exports = makeGetPaymentType
