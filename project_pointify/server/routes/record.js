const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of
// requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

// This section will help create a new record.
recordRoutes.route('/record/add').post((req, response) => {
  const dbConnect = dbo.getDb();
  const myObj = {
    username: req.body.username,
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    desc: req.body.desc,
  };
  dbConnect.collection('Events').insertOne(myObj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help get a single record by id
recordRoutes.route('/record/:id').get((req, res) => {
  const dbConnect = dbo.getDb();
  const myquery = { _id: ObjectId(req.params.id) };
  dbConnect
    .collection('Events')
    .findOne(myquery, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help get a list of all the records.
recordRoutes.route('/record').get((_req, res) => {
  const dbConnect = dbo.getDb('Pointify');
  dbConnect
    .collection('Events')
    .find({}).sort({ date: 1, _id: 1 })
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = recordRoutes;
