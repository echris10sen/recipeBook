/****************************************************************************************
 * Imports
 * **************************************************************************************/
const express = require('express');
const api_docsRoute = require('./api-docs');
const authRoute = require('./authRoute');
const bookRoute = require('./bookRoute');
const { ensureSession } = require('../utils/validation/authValidation');
const dotenv = require('dotenv');
const recipeRoute = require('./recipeRoute');
const reviewRoute = require('./reviewRoute');
const userRoute = require('./userRoute');
const utils = require('../utils');
/****************************************************************************************
 * Configuration
 * **************************************************************************************/
const router = express.Router();
dotenv.config();

/****************************************************************************************
 * Middleware
 * **************************************************************************************/
// API Documentation
router.use('/api-docs', ensureSession, api_docsRoute);

// Authentication
router.use('/auth', authRoute);

// Book
router.use('/book', ensureSession, bookRoute);

// Recipe
router.use('/recipe', ensureSession, recipeRoute);

// Review
router.use('/review', ensureSession, reviewRoute);

// User
router.use('/user', userRoute);

/****************************************************************************************
 * Routes
 * **************************************************************************************/
router.get('/', utils.handleErrors((req, res) => {
  /* #swagger.tags = ['Root']
      #swagger.description = 'Root'
  */
  console.log(process.env.REDIRECT_URI);
  res.send('Welcome to the Cookbook API');
  
 
}));



module.exports = router;