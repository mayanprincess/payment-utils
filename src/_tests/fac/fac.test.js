const cardValidator = require('card-validator')
const fac = require('../../fac')({ cardValidator })

const mastercardNum = '5111111111111111'
const amexNum = '341111111111111'
const visaNum = '4111111111111111'

test('getAuthorizeEndpoint returns correct for mc, amex, and visa', () => {
  expect(fac.getAuthorizeEndpoint({ cardNumber: mastercardNum })).toBe('Authorize3DS')
  expect(fac.getAuthorizeEndpoint({ cardNumber: amexNum })).toBe('Authorize')
  expect(fac.getAuthorizeEndpoint({ cardNumber: visaNum })).toBe('Authorize3DS')
})

test('getPaymentType returns correct for mc, amex, and visa', () => {
  expect(fac.getPaymentType({ cardNumber: mastercardNum })).toBe('3ds')
  expect(fac.getPaymentType({ cardNumber: amexNum })).toBe('authorize')
  expect(fac.getPaymentType({ cardNumber: visaNum })).toBe('3ds')
})

test('valid amounts', () => {
  expect(fac.isValid.amount({ amount: '33.00' })).toBe(true)
  expect(fac.isValid.amount({ amount: '33' })).toBe(false)
})
