const request = require('supertest');
const express = require('express');
const fetch = require('node-fetch');
const dbo = require('../db/dbOperations');

describe('records tests', () => {
  test('add event to event list', async () => {
      
    const val = await fetch('https://project-pointify.herokuapp.com/record/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'testEvent',
          date: 'test',
          time: 'test',
          location: 'test',
          desc: 'test',
        }),
      })
      expect(val.status).toBe(200);
  }),
  test('get event from event list', async () => {

    await fetch(`https://project-pointify.herokuapp.com/record`).then(async (response) => {
      const events = await response.json();
      let eventId;
      let bar = false;
      for (let i = 0; i < events.length; i = i + 1) {
        if (events[i].title == 'testEvent') {
          bar = true;
          eventId = events[i]._id;
        }
      }
      const theEvent = await fetch(`https://project-pointify.herokuapp.com/record/${eventId}`);
      expect(bar).toEqual(true) && expect(theEvent.title).toEqual('testEvent');
      
      
    });
  })
 })