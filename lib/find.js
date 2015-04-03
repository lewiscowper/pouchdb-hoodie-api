'use strict'

var findOne = require('./utils/find-one')
var findMany = require('./utils/find-many')

module.exports = function find (objectsOrIds) {
  var state = {
    db: this,
    errors: this.constructor.Errors
  }
  var isArray = Array.isArray(objectsOrIds)

  return isArray ? findMany(state, objectsOrIds) : findOne(state, objectsOrIds)
}
