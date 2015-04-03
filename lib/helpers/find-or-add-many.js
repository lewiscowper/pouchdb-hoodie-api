var toId = require('../utils/to-id')
var findMany = require('./find-many')
var addMany = require('./add-many')

module.exports = function findOrAddMany (state, passedObjects) {
  var foundObjects
  var passedObjectIds = passedObjects.map(toId)

  return findMany(state, passedObjectIds)

  .then(function (_foundObjects) {
    foundObjects = _foundObjects

    var foundObjectIds = foundObjects.map(toId)
    var notFoundObjects = passedObjects.reduce(function (notFoundObjects, passedObject) {
      if (foundObjectIds.indexOf(passedObject.id) === -1) {
        notFoundObjects.push(passedObject)
      }
      return notFoundObjects
    }, [])

    return addMany(state, notFoundObjects)
  })

  .then(function (addedObjects) {
    var objects = []

    foundObjects.concat(addedObjects).forEach(function (object) {
      var index = passedObjectIds.indexOf(object.id)
      objects[index] = object
    })

    return objects
  })
}
