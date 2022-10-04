const requiredParam = require('../entity/requiredParam')

const isValid = () => {
  const ip = ({ ip = requiredParam('ip') }) => (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))

  const email = ({ email = requiredParam('email') }) => (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))

  const httpsUrl = ({ string = requiredParam('string') }) => {
    let url
    try {
      url = new URL(string)
    } catch (_) {
      return false
    }
    return url.protocol === 'https:'
  }
  return Object.freeze({
    ip,
    email,
    httpsUrl
  })
}

module.exports = isValid
