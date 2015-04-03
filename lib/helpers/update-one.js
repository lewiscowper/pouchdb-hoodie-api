'use strict'

var extend = require('pouchdb-extend')

var changeObject = require('../utils/change-object')
var toDoc = require('../utils/to-doc')
var findOne = require('./find-one')

module.exports = function updateOne (state, idOrObject, change) {
  var object

  if (typeof idOrObject === 'string' && !change) {
    return state.Promise.reject(state.errors.NOT_AN_OBJECT)
  }

  return findOne(state, idOrObject)

  .then(function (object) {
    if (!change) return extend(object, idOrObject)
    return changeObject(change, object)
  })

  .then(function (_object) {
    object = _object
    return state.db.put(toDoc(object))
  })

  .then(function (response) {
    object._rev = response.rev
    return object
  })
}
