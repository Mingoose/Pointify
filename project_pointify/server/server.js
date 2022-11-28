/* eslint-disable no-console */
const express = require('express');

const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: './config.env' });

const port = process.env.PORT || 8888;
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(require('./routes/record'));
app.use(require('./routes/users'));

// get driver connection
const dbo = require('./db/conn');

// wildcard endpoint - send app

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'../build/index.html'));
// })

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer((err) => {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
