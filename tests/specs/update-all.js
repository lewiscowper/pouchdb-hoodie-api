'use strict'

var test = require('tape')

var dbFactory = require('../utils/db')

test('has "updateAll" method', function (t) {
  t.plan(1)

  var db = dbFactory()

  t.is(typeof db.$updateAll, 'function', 'has method')
})

test('db.$updateAll(changedProperties)', function (t) {
  t.plan(10)

  var db = dbFactory()

  return db.$add([{
    foo: 'foo',
    bar: 'foo'
  }, {
    foo: 'bar'
  }, {
    foo: 'baz'
  }])

  .then(function () {
    return db.$updateAll({
      bar: 'bar'
    })
  })

  .then(function (results) {
    t.is(results.length, 3, 'resolves all')

    results.forEach(function (result) {
      t.ok(/^2-/.test(result.rev), 'new revision')
    })

    return null
  })

  .then(db.$findAll.bind(db))

  .then(function (objects) {
    objects.forEach(function (object) {
      t.ok(object.foo, 'old value remains')
      t.is(object.bar, 'bar', 'updated object')
    })
  })
})

test('db.$updateAll(updateFunction)', function (t) {
  t.plan(10)

  var db = dbFactory()

  return db.$add([{
    foo: 'foo',
    bar: 'foo'
  }, {
    foo: 'bar'
  }, {
    foo: 'baz'
  }])

  .then(function () {
    return db.$updateAll(function (object) {
      object.bar = 'bar'
      return object
    })
  })

  .then(function (results) {
    t.is(results.length, 3, 'resolves all')

    results.forEach(function (result) {
      t.ok(/^2-/.test(result.rev), 'new revision')
    })

    return null
  })

  .then(db.$findAll.bind(db))

  .then(function (objects) {
    objects.forEach(function (object) {
      t.ok(object.foo, 'old value remains')
      t.is(object.bar, 'bar', 'updated object')
    })
  })
})

test('fails db.$updateAll()', function (t) {
  t.plan(1)

  var db = dbFactory()

  db.$updateAll()

  .catch(function (err) {
    t.ok(err instanceof Error, 'rejects error')
  })
})

test('db.$updateAll(change) no objects', function (t) {
  t.plan(1)

  var db = dbFactory()

  db.$updateAll({})

  .then(function (results) {
    t.same(results, [], 'reolves empty array')
  })
})
