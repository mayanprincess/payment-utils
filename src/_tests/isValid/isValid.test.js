const isValid = require('../../isValid')()

test('validates ip correctly', () => {
  expect(isValid.ip({ ip: '127.0.0.1' })).toBe(true)
  expect(isValid.ip({ ip: '127.0.0' })).toBe(false)
})

test('validates email correctly', () => {
  expect(isValid.email({ email: 'dev@gmail.com' })).toBe(true)
  expect(isValid.email({ email: 'dev@gmail' })).toBe(false)
})

test('validtes httpsUrl correctly', () => {
  expect(isValid.httpsUrl({ string: 'https://dev.com' })).toBe(true)
  expect(isValid.httpsUrl({ string: 'http://dev.com' })).toBe(false)
})
