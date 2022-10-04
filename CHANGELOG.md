## [2.2.0] - 2021-06-24
### Added
- fac.getPaymentType added for updated /payment endpoint on friday ^4.4.0-alpha

## [2.1.1] - 2021-06-24
### Added
- expressCallback : httpRequest.ip brought back using request-ip off req itself

## [2.1.0] - 2021-06-22
### Added
- discord util added for dispatching messages via axios

## [2.0.5] - 2021-06-02
### Added
- dao.find.all(...params) added incase we need params passed in that Model.find method

## [2.0.4] - 2021-05-21
### Added
- dao error log doc id added

## [2.0.0] - 2021-05-05
### Removed
- all typescript removed from build

## [2.0.0] - 2021-04-24
### Deprecated
- genericDao rehauled into mongo module
- all card validators and fac utils have been reworked
- [jarvis] deprecating ccmUtils.getters.getAuthorizeEndpoint -> fac.getAuthorizeEndpoint({cardNumber})
- [friday] deprecating ccmUtils.getters.getPaddedCardNumber -> card.padNumber({number})
- [friday] deprecating ccmUtils.validations.cc.isValid -> card.isValid...
- [friday] deprecating ccmUtils.validations.fac. -> fac.isValid...

### Added
- mongo module added with sub modules/methods:
  - mongo.init({mongoUrl, log, connectCallback})
  - mongo.dao
    - dao.add({entity})
    - dao.update({entity})
    - dao.overwrite({entity})
    - dao.find
      - find.all
      - find.param({param, quantity})
      - find.docId({_id})
    - dao.delete
      - delete.docId({_id})
      - delete.param({param})
- optional 'log' param for mongo module, defaults to ihnUtils logger
- express module for expressCallback
- card module with isValid submodule

### Changed
- requiredParam moved into entity module

### Removed
- helpers module
- validations.cc module
- getters module
- validations.fac module
- validations.general module

## [1.3.0] - 2021-04-09
### Added
- mongo genericDao `update` method added, deprecating `overwrite` soon

## [1.2.1] - 2021-04-08
### Removed
- sendinblue api removed with emailer module due to webpack issues exporting module

## [1.2.0] - 2021-04-07
### Added
- sendinblue api added via emailer module

## [1.1.7] - 2020-12-13
### Added
- genericDao + helpers/requiredParam

## [1.1.6] - 2020-11-12
### Changed
- package dependency updates via yarn upgrade

## [1.1.5] - 2020-11-03
### Changed
- @consultoriahn to @informaticahn

## [1.1.4] - 2020-10-27
### Added
- getters.getPaddedCardNumber added

## [1.1.1] - 2020-10-20
### Changed
- modified exports for getters to remove double getters.getters call

### Added
- winston logger added
- jest tests for cc.js
- standard to test script
- expiration date validation updated to use card-validator .expirationDate method

### Changed
- module.exports updated to have ccmUtils.logger.log.info method avail
- cvv 
  - only accepts numeric
  - amex requires exactly 4 digits 
- webpack config updated leaving winston and fs as external deps
