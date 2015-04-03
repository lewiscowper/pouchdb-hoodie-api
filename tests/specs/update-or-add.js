'use strict'

var test = require('tape')

var dbFactory = require('../utils/db')

test('db.$updateOrAdd exists', function (t) {
  t.plan(1)

  var db = dbFactory()

  t.is(typeof db.$updateOrAdd, 'function', 'has method')
})

test('db.$updateOrAdd(id, object) updates existing', function (t) {
  t.plan(2)

  var db = dbFactory()

  db.$add({id: 'exists', foo: 'bar'})

  .then(function () {
    return db.$updateOrAdd('exists', {foo: 'baz'})
  })

  .then(function (object) {
    t.is(object.id, 'exists', 'resolves with id')
    t.is(object.foo, 'baz', 'resolves with new object')
  })
})

test('db.$updateOrAdd(id, object) adds new if non-existent', function (t) {
  t.plan(2)

  var db = dbFactory()

  return db.$updateOrAdd('newid', {foo: 'baz'})

  .then(function (object) {
    t.is(object.id, 'newid', 'resolves with id')
    t.is(object.foo, 'baz', 'resolves with new object')
  })
})

test('db.$updateOrAdd(id) fails with 400 error', function (t) {
  t.plan(1)

  var db = dbFactory()

  return db.$updateOrAdd('id')

  .catch(function (error) {
    t.is(error.status, 400, 'rejects with invalid request error')
  })
})

test('db.$updateOrAdd(object) updates existing', function (t) {
  t.plan(2)

  var db = dbFactory()

  db.$add({id: 'exists', foo: 'bar'})

  .then(function () {
    return db.$updateOrAdd({id: 'exists', foo: 'baz'})
  })

  .then(function (object) {
    t.is(object.id, 'exists', 'resolves with id')
    t.is(object.foo, 'baz', 'resolves with new object')
  })
})

test('db.$updateOrAdd(object) adds new if non-existent', function (t) {
  t.plan(2)

  var db = dbFactory()

  return db.$updateOrAdd({id: 'newid', foo: 'baz'})

  .then(function (object) {
    t.is(object.id, 'newid', 'resolves with id')
    t.is(object.foo, 'baz', 'resolves with new object')
  })
})

test('db.$updateOrAdd(object) without object.id fails with 400 error', function (t) {
  t.plan(1)

  var db = dbFactory()

  return db.$updateOrAdd({foo: 'bar'})

  .catch(function (error) {
    t.is(error.status, 400, 'rejects with invalid request error')
  })
})

test('db.$updateOrAdd(array) updates existing, adds new', function (t) {
  t.plan(5)

  var db = dbFactory()

  db.$add([
    {id: 'exists', foo: 'bar'}
  ])

  .then(function () {
    return db.$updateOrAdd([
      {id: 'exists', foo: 'baz'},
      {id: 'unknown', foo: 'baz'}
    ])
    .then(function (objects) {
      t.is(objects[0].id, 'exists', 'object1 to be updated')
      t.is(objects[0].foo, 'baz', 'object1 to be updated')
      t.is(parseInt(objects[0]._rev, 10), 2, 'object1 has revision 2')
      t.is(objects[1].id, 'unknown', 'object2 to be created')
      t.is(objects[1].foo, 'baz', 'object2 to be created')
    })
  })
})
