'use strict'

var updateOne = require('./utils/update-one')
var updateMany = require('./utils/update-many')

module.exports = function remove (objectsOrIds) {
  var state = {
    db: this,
    Promise: this.constructor.utils.Promise,
    errors: this.constructor.Errors
  }
  var isArray = Array.isArray(objectsOrIds)

  return isArray ? updateMany(state, objectsOrIds, {_deleted: true})
                 : updateOne(state, objectsOrIds, {_deleted: true})
}
