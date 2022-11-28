const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const lib = require('../db/dbOperations');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of
// requests starting with path /record.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you create a new record.
userRoutes
  .route('/register')
  .post(async (req, res) => {
    const {
      username, password, recoveryq, recoverya, joinDate,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedAnswer = await bcrypt.hash(recoverya, salt);
    try {
      const result = await lib.addUser(
        dbo.getDb(),
        username,
        hashedPassword,
        recoveryq,
        hashedAnswer,
        joinDate,
      );
      // send the response
      res.status(201).json({ message: `User with id ${JSON.stringify(result.insertedId)} added` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'try again later' });
    }
  });

userRoutes
  .route('/users/:user')
  .get(async (req, res) => {
    const { user } = req.params;
    try {
      const result = await lib.findUser(dbo.getDb(), user);
      console.log(result);
      // send the response
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'try again later' });
    }
  });

userRoutes
  .route('/users')
  .get(async (req, res) => {
    try {
      const result = await lib.getAllUsers(dbo.getDb());
      console.log(result);
      // send the response
      res.status(201).send(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'try again later' });
    }
  });
userRoutes
  .route('/block')
  .put(async (req, res) => {
    // eslint-disable-next-line camelcase
    console.log('hasd');
    const { user, action } = req.body;
    try {
      if (action === 'block') {
        await lib.blockUser(dbo.getDb(), user);
      }
      if (action === 'unBlock') {
        await lib.unblockUser(dbo.getDb(), user);
      }
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'try again later' });
    }
  });

userRoutes
  .route('/reset')
  .put(async (req, res) => {
    // eslint-disable-next-line camelcase
    const { newPassword, userName } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    console.log('got hqeq');
    try {
      await lib.resetPassword(dbo.getDb(), userName, hashedPassword);
      res.status(201);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'try again later' });
    }
  });

userRoutes
  .route('/')
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });

userRoutes
  .route('*')
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, '../../build/index.html'));
  });

module.exports = userRoutes;
