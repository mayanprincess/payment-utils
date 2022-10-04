const cardValidator = require('card-validator')
const testNumbers = require('../../card/testNumbers')
const card = require('../../card')({ cardValidator, testNumbers })

const mastercardNum = '5111111111111111'
const amexNum = '341111111111111'
const visaNum = '4111111111111111'
const paddedNumTest = 'XXXXXXXXXXXX1111'
const paddedNumTwoTest = 'XXX8989'

test('error on invalid card numbers', () => {
  expect(card.isValid.number({ number: '203942' })).toBe(false)
  expect(card.isValid.number({ number: '' })).toBe(false)
})

test('validates (test) mastercard, american express, visa numbers', () => {
  expect(card.isValid.number({ number: mastercardNum })).toBe(true)
  expect(card.isValid.number({ number: amexNum })).toBe(true)
  expect(card.isValid.number({ number: visaNum })).toBe(true)
})

test('amex cvv should be exactly 4 digits', () => {
  expect(card.isValid.cvv({ number: amexNum, cvv: '1234' })).toBe(true)
  expect(card.isValid.cvv({ number: amexNum, cvv: '123' })).toBe(false)
})

test('other card cvv should be exactly 3 digits', () => {
  expect(card.isValid.cvv({ number: mastercardNum, cvv: '123' })).toBe(true)
  expect(card.isValid.cvv({ number: mastercardNum, cvv: '1234' })).toBe(false)
  expect(card.isValid.cvv({ number: visaNum, cvv: '1234' })).toBe(false)
  expect(card.isValid.cvv({ number: visaNum, cvv: '123' })).toBe(true)
})

test('cvv should only accept numeric characters', () => {
  expect(card.isValid.cvv({ number: mastercardNum, cvv: 'ABC' })).toBe(false)
  expect(card.isValid.cvv({ number: mastercardNum, cvv: '123' })).toBe(true)
})

test('expiry date validations', () => {
  expect(card.isValid.expiryDate({ MMYY: '0120' })).toBe(false)
  expect(card.isValid.expiryDate({ MMYY: '0130' })).toBe(true)
})

test('padNumber returns XXX + last 4 digits', () => {
  expect(card.padNumber({ number: mastercardNum })).toBe('1111')
  expect(card.padNumber({ number: amexNum })).toBe('1111')
  expect(card.padNumber({ number: paddedNumTest })).toBe('1111')
  expect(card.padNumber({ number: paddedNumTwoTest })).toBe('8989')
})
