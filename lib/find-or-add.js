'use strict'

var findOrAddOne = require('./utils/find-or-add-one')
var findOrAddMany = require('./utils/find-or-add-many')

module.exports = function findOrAdd (idOrObjectOrArray, newObject) {
  var state = {
    db: this,
    Promise: this.constructor.utils.Promise,
    errors: this.constructor.Errors
  }
  var isArray = Array.isArray(idOrObjectOrArray)

  return isArray ? findOrAddMany(state, idOrObjectOrArray) : findOrAddOne(state, idOrObjectOrArray, newObject)
}
