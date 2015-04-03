'use strict'

var updateOrAddOne = require('./helpers/update-or-add-one')
var updateOrAddMany = require('./helpers/update-or-add-many')

module.exports = function updateOrAdd (idOrObjectOrArray, newObject) {
  var state = {
    db: this,
    Promise: this.constructor.utils.Promise,
    errors: this.constructor.Errors
  }
  var isArray = Array.isArray(idOrObjectOrArray)

  return isArray ? updateOrAddMany(state, idOrObjectOrArray) : updateOrAddOne(state, idOrObjectOrArray, newObject)
}
