/****************************************************************************************
 * Imports
 * **************************************************************************************/
const express = require('express');
const api_docsRoute = require('./api-docs');
const authRoute = require('./authRoute');
const bookRoute = require('./bookRoute');
const oauth = require('../config/auth/oauth');
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
  /* #swagger.tags = ['Root']
      #swagger.description = 'Root'
  */

    try {
      const authorizationUrl = oauth.generateAuthUrl();
      console.log('authorizationUrl: ', authorizationUrl);
      res.redirect(authorizationUrl);
    } catch (error) {
      if (error.message === 'invalid_grant') {
        // Redirect the user back to the authorization URL
        const authorizationUrl = oauth.generateAuthUrl();
        res.redirect(authorizationUrl);
      } else {
        // Handle other errors
        console.error(error);
        res.status(500).send('An error occurred');
      }
    }
 
}));



module.exports = router;