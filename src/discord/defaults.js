const ihnApiPathDefault = 'https://devapi.informaticahn.com'

const channelMapDefaults = {
  'ccm-payments': {
    prod: '851683347067174932',
    dev: '857030976358187018'
  },
  errors: {
    prod: '857031090051743764',
    dev: '857031127176183838'
  },
  info: {
    prod: '857031613359718410',
    dev: '857031668149387304'
  }
}

module.exports = {
  ihnApiPathDefault,
  channelMapDefaults
}
