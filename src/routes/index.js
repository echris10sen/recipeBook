/****************************************************************************************
 * Imports
 * **************************************************************************************/
const express = require('express');
const api_docsRoute = require('./api-docs');
const authRoute = require('./authRoute');
const bookRoute = require('./bookRoute');
const recipeRoute = require('./recipeRoute');
const reviewRoute = require('./reviewRoute');
const userRoute = require('./userRoute');
const utils = require('../utils');
/****************************************************************************************
 * Configuration
 * **************************************************************************************/
const router = express.Router();

/****************************************************************************************
 * Middleware
 * **************************************************************************************/
// API Documentation
router.use('/api-docs', api_docsRoute);

// Authentication
router.use('/auth', authRoute);

// Book
router.use('/book', bookRoute);

// Recipe
router.use('/recipe', recipeRoute);

// Review
router.use('/review', reviewRoute);

// User
router.use('/user', userRoute);

/****************************************************************************************
 * Routes
 * **************************************************************************************/
router.get('/', utils.handleErrors((req, res) => {
  res.send('Welcome to the Recipe Book API');
}));



module.exports = router;