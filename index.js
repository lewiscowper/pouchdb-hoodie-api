'use strict'

module.exports = {
  $add: require('./lib/add'),
  $find: require('./lib/find'),
  $findAll: require('./lib/find-all'),
  $findOrAdd: require('./lib/find-or-add'),
  $update: require('./lib/update'),
  $updateOrAdd: require('./lib/update-or-add'),
  $updateAll: require('./lib/update-all'),
  $remove: require('./lib/remove')
}
