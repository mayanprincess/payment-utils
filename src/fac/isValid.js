const requiredParam = require('../entity/requiredParam')

const VALID_TRANSACTION_CODES = ['0', '1', '2', '4', '8', '64', '128', '256', '512', '1024', '2048', '4096', '8192']
const VALID_MODIFICATION_TYPES = ['1', '2', '3']

const isValid = () => {
  const amount = ({ amount = requiredParam('amount') }) => /^\d+(?:\.\d{0,2})$/.test(amount)
  const transactionCode = ({ code = requiredParam('code') }) => VALID_TRANSACTION_CODES.includes(code)
  const modificationType = ({ type = requiredParam('type') }) => VALID_MODIFICATION_TYPES.includes(type)

  // @Todo check pdf if any rules exist
  const cardToken = ({ string }) => {
    if (!string) return false
    return (string.length > 5)
  }

  // @Todo probably check vs PREFIX
  const orderNumber = ({ string }) => {
    if (!string) return false
    return (string.length > 3)
  }
  return Object.freeze({
    amount,
    transactionCode,
    modificationType,
    cardToken,
    orderNumber
  })
}

module.exports = isValid
