const defaults = require('../../discord/defaults')
const discordUtil = require('../../discord')
const ihnApiKey = '12345'
const axios = {
  post: jest.fn((url, params, headers) => {
    return new Promise((resolve, reject) => {
      resolve({
        url,
        params,
        headers
      })
    })
  })
}
const log = {
  info: jest.fn(() => {}),
  error: jest.fn(() => {})
}
const discord = discordUtil({ source: 'dev', ihnApiKey, axios, log })

const DEFAULT_PAYLOAD = {
  event: 'some-event',
  message: 'some-message!',
  channel: 'info'
}

test('expect source param to be available from discord obj', async () => {
  const d = discordUtil({ source: 'prod', ihnApiKey, axios, log })
  expect(d.source).toBe('prod')
})

test('expect error on invalid source string', async () => {
  try {
    discordUtil({ source: 'not-prod-or-dev', ihnApiKey, axios, log })
  } catch (e) {
    expect(e.message).toBe('source param must include "dev" or "prod"')
  }
})

test('expect error on invalid channel string', async () => {
  try {
    await discord.dispatch({
      ...DEFAULT_PAYLOAD,
      channel: 'some-wrong-channel'
    })
  } catch (e) {
    expect(e.message).toBe('dispatch({channel}) : no key found for some-wrong-channel')
  }
})

test('expect correct url on message dispatch', async () => {
  const result = await discord.dispatch(DEFAULT_PAYLOAD)
  const expectedUrl = `${defaults.ihnApiPathDefault}/discord`
  expect(result.url).toBe(expectedUrl)
})

test('expect correct params on message dispatch', async () => {
  const result = await discord.dispatch(DEFAULT_PAYLOAD)
  const expectedParams = {
    event: DEFAULT_PAYLOAD.event,
    message: DEFAULT_PAYLOAD.message,
    channelId: defaults.channelMapDefaults.info.dev
  }
  expect(result.params).toStrictEqual(expectedParams)
})

test('expect correct params on message dispatch using a prod source', async () => {
  const discordProd = discordUtil({ source: 'prod', ihnApiKey, axios, log })
  const result = await discordProd.dispatch(DEFAULT_PAYLOAD)
  const expectedParams = {
    event: DEFAULT_PAYLOAD.event,
    message: DEFAULT_PAYLOAD.message,
    channelId: defaults.channelMapDefaults.info.prod
  }
  expect(result.params).toStrictEqual(expectedParams)
})

test('expect correct headers on message dispatch', async () => {
  const result = await discord.dispatch(DEFAULT_PAYLOAD)
  const expectedHeader = {
    headers: {
      'content-type': 'application/json',
      'x-api-key': '12345'
    }
  }
  expect(result.headers).toStrictEqual(expectedHeader)
})
