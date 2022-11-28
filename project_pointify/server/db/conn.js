/* eslint-disable no-underscore-dangle */
const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../config.env' });
console.log(process.env);

const Db = process.env.ATLAS_URI;
console.log(Db);
console.log('debug');
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer(callback) {
    client.connect((err, db) => {
      // Verify we got a good "db" object
      if (db) {
        _db = db.db('Pointify');
        console.log('Successfully connected to MongoDB.');
      }
      return callback(err);
    });
  },

  getDb() {
    return _db;
  },
};
