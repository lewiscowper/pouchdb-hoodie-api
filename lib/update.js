'use strict'

var updateOne = require('./helpers/update-one')
var updateMany = require('./helpers/update-many')

module.exports = function update (objectsOrIds, change) {
  var Promise = this.constructor.utils.Promise
  var state = { db: this, Promise: Promise, errors: this.constructor.Errors }
  var isArray = Array.isArray(objectsOrIds)

  if (typeof objectsOrIds !== 'object' && !change) {
    return Promise.reject(new Error('Must provide change'))
  }

  return isArray ? updateMany(state, objectsOrIds, change) : updateOne(state, objectsOrIds, change)
}
