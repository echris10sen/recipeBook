/************************************
 * This server.js file is the entry 
 * point for the Recipe Book API
 * **********************************/

/************************************
 * Imports
 * **********************************/
const bodyParser = require('body-parser');
const colors = require('colors');
const env = require('dotenv');
const express = require('express');
const routes = require('./src/routes');

/************************************
 * Configuration
 * **********************************/
env.config();
const app = express();

// For debugging
colors.enable();

/************************************
 * Middleware
 * **********************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/************************************
 * Routes
 * **********************************/
app.use('/', routes);


/************************************
 * Server
 * **********************************/
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`.green.bold);
});