'use strict'

var test = require('tape')

var dbFactory = require('../utils/db')

test('db.$findAll exists', function (t) {
  t.plan(1)

  var db = dbFactory()

  t.is(typeof db.$findAll, 'function', 'has method')
})

test('db.$findAll()', function (t) {
  t.plan(3)

  var db = dbFactory()

  db.$findAll()

  .then(function (objects) {
    t.same(objects, [], 'resolves empty array')

    return db.$add([{foo: 'bar'}, {foo: 'baz'}])
  })

  .then(db.$findAll.bind(db))

  .then(function (objects) {
    t.is(objects.length, 2, 'resolves all')

    return db.$remove(objects[0])
  })

  .then(db.$findAll.bind(db))

  .then(function (objects) {
    t.is(objects.length, 1, 'resolves all')
  })
})

test('db.$findAll(filterFunction)', function (t) {
  t.plan(1)

  var db = dbFactory()

  db.$add([{
    foo: 0
  }, {
    foo: 'foo'
  }, {
    foo: 2
  }, {
    foo: 'bar'
  }, {
    foo: 3
  }, {
    foo: 'baz'
  }, {
    foo: 4
  }])

  .then(function () {
    return db.$findAll(function (object) {
      return typeof object.foo === 'number'
    })
  })

  .then(function (objects) {
    t.is(objects.length, 4, 'resolves filtered')
  })
})
