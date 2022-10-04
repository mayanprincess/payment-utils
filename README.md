[![Actions Status](https://github.com/informaticahn/utils/workflows/Build%20and%20Test/badge.svg)](https://github.com/informaticahn/utils/actions)

### local dev
```
yarn global add standard
yarn
yarn start
```

### publishing
```
yarn test
yarn build
yarn publish
```

## logger
```
const ihnUtils = require('@informaticahn/utils')
const log = ihnUtils.logger.log

log.info({
  event: 'some info event',
  message: 'some message'
})

log.error({
  event: 'some error event',
  message: 'some message'
})
```

## mongo

### connection
initialize connection to a mongo database
```
const ihnUtils = require('@informaticahn/utils')
const mongoose = require('mongoose')

const mongoInit = ihnUtils.mongo.init({mongoose})
const mongoConfig = {
  mongoUrl,         //full mongo url connection string
  log,              //logger i.e. ihnUtils.logger.log
  connectCallback   //optional callback method
}
mongoInit.connect(mongoConfig)
```

### dao
- generic dao for core Model methods
- initialize dao with {Model, log} for each mongo Schema (Model)
```
const userDao = ihnUtils.mongo.dao({ Model: models.User, log })
```

### dao methods
```
add({entity})                       //entity matches Model schema
update({entity})                    //entity must have ._id for document id update
overwrite({entity})                 //entity must have ._id for document id update
find
  .all()                            //Model.find({}) all documents for schema
  .all(...params)                   //Model.find(params) all documents matching params obj
    // find by nested param match : await bookingDao.find.all({'ccm.status': 'COMPLETED'})
  .docId({_id})                     //Model.findById({_id})
  .param({anyParam: 'whatever'})    //finds by dynamic param i.e. await dao.find.param({ username: 'admin' }).one()
    .one()
    .all()
delete
  .docId({_id})
  .param({anyParam: 'whatever'})    //currently deletes one by default i.e. dao.delete({username: 'admin'})
```

## card
ihnUtils.card
```
.padNumber({number: cardNumber})    // returns last 4
```

### card methods
```
isValid
  .number({number})
  .cvv({number, cvv})
  .expiryDate({MMYY})
```

## fac
ihnUtils.fac
```
.getAuthorizeEndpoint({cardNumber}) -> deprecating with friday ^5.0.0
.getPaymentType({cardNumber})
isValid
  amount({amount})
  transactionCode({code})
  modificationType({type})
  cardToken({string})
  orderNumber({string})
```

## isValid
general validations
ihnUtils.isValid
```
ip({ip})
email({email})
httpsUrl({string})
```

## endpoints
methods / modules for use with express endpoints
ihnUtils.endpoints
```
.expressCallback( controller )
```

## entity
methods / helpers related to entity objects
ihnUtils.entity
```
.requiredParam(param) // accepts param:string
```
use :
```
const demo = ({
  someParam = requiredParam('someParam'),
  otherParam = requiredParam('otherParam')
}) => {}
```

### discord
util to dispatch events into our discord server
```
const discord = require('@informaticahn/utils').discord({
  source,
  ihnApiKey,
  axios,
  log,
  channelMap,
  ihnApiPath
})
```
source : 'prod' || 'dev' -> used for finding channelIds from channelMap[${channel}][${source}]
ihnApiKey : 'x-api-key'
axios : 'axios'
log : ihn logger -> require('@informaticahn/utils').logger.log
channelMap : optional -> { 'channel-name': { prod: 'prodChannelId', dev: 'devChannelId' }} -> has defaults
ihnApiPath : optional -> defaults to https://devapi.informaticahn.com

## discord methods
```
.dispatch = ({
  event,
  message,
  channel
}
```
grabs channelId from ${channelMap[channel][source]}
sends out `${event} | ${message}`
