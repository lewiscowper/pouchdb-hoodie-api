'use strict'

module.exports = {
  $add: require('./add'),
  $find: require('./find'),
  $findAll: require('./find-all'),
  $findOrAdd: require('./find-or-add'),
  $update: require('./update'),
  $updateOrAdd: require('./update-or-add'),
  $updateAll: require('./update-all'),
  $remove: require('./remove')
}
