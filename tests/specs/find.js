'use strict'

var test = require('tape')

var dbFactory = require('../utils/db')

test('db.$find exists', function (t) {
  t.plan(1)

  var db = dbFactory()
  t.is(typeof db.$find, 'function', 'has method')
})

test('db.$find(id)', function (t) {
  t.plan(1)

  var db = dbFactory()

  db.$add({
    id: 'foo'
  })

  .then(function () {
    return db.$find('foo')
  })

  .then(function (object) {
    t.is(object.id, 'foo', 'resolves value')
  })
})

test('db.$find(object)', function (t) {
  t.plan(1)

  var db = dbFactory()

  db.$add({
    id: 'foo'
  })

  .then(function () {
    return db.$find({id: 'foo'})
  })

  .then(function (object) {
    t.is(object.id, 'foo', 'resolves value')
  })
})

test('db.$find fails for non-existing', function (t) {
  t.plan(4)

  var db = dbFactory()

  db.$add({
    id: 'unrelated'
  })

  .then(function () {
    return db.$find('foo')
  })

  .catch(function (err) {
    t.ok(err instanceof Error, 'rejects error')
    t.is(err.status, 404)
  })

  db.$find({id: 'foo'})

  .catch(function (err) {
    t.ok(err instanceof Error, 'rejects error')
    t.is(err.status, 404)
  })
})

test('db.$find(array)', function (t) {
  t.plan(2)

  var db = dbFactory()

  db.$add([
    { id: 'foo' },
    { id: 'bar' }
  ])

  .then(function () {
    return db.$find(['foo', {id: 'bar'}])
  })

  .then(function (objects) {
    t.is(objects[0].id, 'foo', 'resolves value')
    t.is(objects[1].id, 'bar', 'resolves value')
  })
})

test('db.$find(array) with non-existing', function (t) {
  t.plan(2)

  var db = dbFactory()

  db.$add([
    { id: 'exists' }
  ])

  .then(function () {
    return db.$find(['exists', 'unknown'])
  })

  .then(function (objects) {
    t.is(objects[0].id, 'exists', 'resolves with value for existing')
    t.is(objects[1].status, 404, 'resolves with 404 error for unknown')
  })
})
