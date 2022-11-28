const request = require('supertest');
const express = require('express');
const fetch = require('node-fetch');

const userRoutes = express.Router();
const dbo = require('../db/dbOperations');


describe('users tests', () => {
  test('user Routes register code 201', async () => {
    const res = await fetch(`https://project-pointify.herokuapp.com/users/testUser`);
      const val = await fetch('https://project-pointify.herokuapp.com/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testUser',
          password: 'testPassword',
          recoveryq: 'testQuestion',
          recoverya: 'testAnswer',
          joinDate: (new Date(Date.now())).toDateString(),
        }),
      });
      //console.log(val);
      expect(val.status).toEqual(201);
  });

  test('get user from list', async () => {

    await fetch(`https://project-pointify.herokuapp.com/users`).then(async (response) => {
      const users = await response.json();
      let usersName;
      let bar = false;
      for (let i = 0; i < users.length; i = i + 1) {
        if (users[i].username == 'testUser') {
          bar = true;
          usersName = users[i].username;
        }
      }
      const theUser = await fetch(`https://project-pointify.herokuapp.com/users/${usersName}`);
      expect(bar).toEqual(true) && expect(theUser.recoveryQuestion).toEqual('testQuestion');
      
    });
  })

  test('block user', async () => {

    await fetch('https://project-pointify.herokuapp.com/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'testUser',
        action: 'block'
      }),
    }).then(async (response) => {
      const theUser = await fetch(`https://project-pointify.herokuapp.com/users/testUser`);
      expect(theUser.blocked).toEqual('Yes');
    });
  })

  test('unblock user', async () => {

    await fetch('https://project-pointify.herokuapp.com/block', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'testUser',
        action: 'unBlock'
      }),
    }).then(async (response) => {
      const theUser = await fetch(`https://project-pointify.herokuapp.com/users/testUser`);
      expect(theUser.blocked).toEqual('No');
    });
  })

  test('reset password', async () => {
    const user = await fetch(`https://project-pointify.herokuapp.com/users/testUser`);
    await fetch('https://project-pointify.herokuapp.com/reset', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: 'testPassword1',
        userName: 'testUser'
      }),
    }).then(async (response) => {
      const theUser = await fetch(`https://project-pointify.herokuapp.com/users/testUser`);
      expect(theUser.password).not.toEqual(user.password);
    });
  })
})