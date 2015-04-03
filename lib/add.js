'use strict'

var addOne = require('./helpers/add-one')
var addMany = require('./helpers/add-many')

module.exports = function add (objects) {
  var isArray = Array.isArray(objects)
  var state = {
    db: this,
    Promise: this.constructor.utils.Promise,
    errors: this.constructor.Errors
  }

  return isArray ? addMany(state, objects) : addOne(state, objects)
}
