'use strict'

var toObject = require('./utils/to-object')
var toDoc = require('./utils/to-doc')

module.exports = function removeAll (filter) {
  var objects

  return this.allDocs({
    include_docs: true
  })

  .then(function (res) {
    objects = res.rows.map(function (row) {
      return toObject(row.doc)
    })

    if (typeof filter === 'function') {
      objects = objects.filter(filter)
    }

    return objects.map(function (object) {
      var doc = toDoc(object)
      doc._deleted = true
      return doc
    })
  })

  .then(this.bulkDocs.bind(this))

  .then(function (results) {
    return results.map(function (result, i) {
      objects[i]._rev = result.rev
      return objects[i]
    })
  })
}
