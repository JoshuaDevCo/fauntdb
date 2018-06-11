'use strict';

import faunadb from 'faunadb'
// const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

exports.handler = (event, context, callback) => {
  console.log("delete todo");
  return client.query(q.Delete(q.Ref("classes/todos/"+event.pathParameters.id)))
  .then((response) => {
    console.log("success", response);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
};