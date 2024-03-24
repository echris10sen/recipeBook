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
const session = require('express-session');
const { default: RedisStore } = require('connect-redis');
const redis = require('redis');

/************************************
 * Configuration
 * **********************************/
env.config();
const app = express();
const redisClient = redis.createClient();
const secure = process.env.NODE_ENV === 'production';

// For debugging
colors.enable();

/************************************
 * Middleware
 * **********************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure }
}));

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