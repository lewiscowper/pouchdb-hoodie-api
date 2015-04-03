'use strict'

var findOne = require('./helpers/find-one')
var findMany = require('./helpers/find-many')

module.exports = function find (objectsOrIds) {
  var state = {
    db: this,
    errors: this.constructor.Errors
  }
  var isArray = Array.isArray(objectsOrIds)

  return isArray ? findMany(state, objectsOrIds) : findOne(state, objectsOrIds)
}
