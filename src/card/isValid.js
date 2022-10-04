const requiredParam = require('../entity/requiredParam')

const isValid = ({
  cardValidator = requiredParam('cardValidator'),
  testNumbers = requiredParam('testNumbers')
}) => {
  const number = ({ number }) => testNumbers.includes(number) ? true : cardValidator.number(number).isValid

  const cvv = ({
    number = requiredParam('number'),
    cvv = requiredParam('cvv')
  }) => {
    if (isNaN(cvv)) {
      return false
    }
    const cardType = cardValidator.number(number).card.type
    return (cardType === 'american-express') ? (cvv.length === 4) : (cvv.length === 3)
  }

  const expiryDate = ({ MMYY = requiredParam('MMYY') }) => {
    if (!MMYY) return false
    if (MMYY.length !== 4) { return false }
    return cardValidator.expirationDate(MMYY).isValid
  }

  return Object.freeze({
    number,
    cvv,
    expiryDate
  })
}

module.exports = isValid
