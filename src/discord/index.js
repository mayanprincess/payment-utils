const requiredParam = require('../entity/')().requiredParam
const { channelMapDefaults, ihnApiPathDefault } = require('./defaults')

const discord = ({
  source = requiredParam('source'),
  ihnApiKey = requiredParam('ihnApiKey'),
  axios = requiredParam('axios'),
  log = requiredParam('log'),
  channelMap,
  ihnApiPath
}) => {
  if (!source.includes('dev') && !source.includes('prod')) {
    throw new Error('source param must include "dev" or "prod"')
  }
  channelMap = channelMap || channelMapDefaults
  ihnApiPath = ihnApiPath || ihnApiPathDefault

  /**
   * dispatch to ihn discord
   * @param {channel} channel : 'ccm-payments' || 'errors' || 'info'
   */
  const dispatch = ({
    event = requiredParam('event'),
    message = requiredParam('message'),
    channel = requiredParam('channel')
  }) => {
    const channelKeys = Object.keys(channelMap)
    let foundChannel = false
    for (let i = 0; i < channelKeys.length; i++) {
      if (channel === channelKeys[i]) {
        foundChannel = true
        break
      }
    }
    if (!foundChannel) {
      throw new Error(`dispatch({channel}) : no key found for ${channel}`)
    }
    try {
      const channelId = channelMap[channel][source]
      log.info({
        event: 'discord | dispatch request',
        dispatchedEvent: event,
        message,
        channelId
      })
      return axios.post(`${ihnApiPath}/discord`,
        {
          event, message, channelId
        },
        {
          headers: {
            'content-type': 'application/json',
            'x-api-key': ihnApiKey
          }
        }
      )
        .then(res => {
          log.info({
            event: 'discord | dispatch success',
            dispatchedEvent: event,
            message,
            channelId
          })
          return res
        })
        .catch(e => {
          log.error({
            event: 'discord | dispatch error',
            dispatchedEvent: event,
            dispatchedMessage: message,
            message: e.message
          })
        })
    } catch (e) {
      log.error({
        event: 'dispatch | dispatch error',
        dispatchedEvent: event,
        dispatchedMessage: message,
        message: e.message
      })
    }
  }

  return Object.freeze({
    dispatch,
    source
  })
}

module.exports = discord
