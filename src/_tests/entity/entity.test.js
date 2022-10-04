const requiredParam = require('../../entity')().requiredParam

test('throws error on requiredParam missing', () => {
  const entity = ({
    user_id = requiredParam('user_id')
  } = {}) => {}
  try {
    entity({
      noUserId: 'hi'
    })
  } catch (e) {
    expect(e.message).toBe('user_id can not be null or undefined.')
  }
})
