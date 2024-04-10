// Desc: Authentication route
const  {oauth2Callback} = require('../controllers/authController');
const { Api500Error } = require('../utils/errors/apiErrors');
const authUtils = require('../utils/auth/oauth');
const authValidation = require('../utils/validation/authValidation');
const axios = require('axios');
const colors = require('colors');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const url = require('url');
const utils = require('../utils');
const { log } = require('console');
const oauth = require('../config/auth/oauth');
const { oauth2Client, generateAuthUrl }= require('../config/auth/oauth');
const people_services = require('googleapis/build/src/apis/people');


// Middleware
router.get('/oauth2callback', utils.handleErrors(async (req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'OAuth2 Callback'
    */
    try {
        oauth2Callback(req, res);
    } catch (error) {
        if (error.message === 'invalid_grant') {
            // Redirect the user back to the authorization URL
            const authorizationUrl = generateAuthUrl();
            res.redirect(authorizationUrl);
          } else {
            // Handle other errors
            console.error(`An error has occured:`.blue +`${error}`);
            res.status(500).send('An error occurred');
          }
        }
}));
router.get('/login', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Login'
    */

    try {
        const authorizationUrl = oauth.generateAuthUrl();
            // console.log('authorizationUrl: ', authorizationUrl);
            res.redirect(authorizationUrl);
        } catch (error) {
            if (error.message === 'invalid_grant') {
                // Redirect the user back to the authorization URL
                const authorizationUrl = oauth.generateAuthUrl();
                res.redirect(authorizationUrl);
            } else {
                // Handle other errors
                console.error(error);
                next(new Api500Error('An error occurred', 500, 'An error occurred while logging in'));   
            }
        }
}));

router.get('/logout', utils.handleErrors(async (req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Logout'
    */
    try {
        authUtils.logout(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Logout failed');
    }
}));

router.post('/register', 
    authValidation.registerUserValidationRules(), 
    authValidation.validateRegisterUser,
    utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Register a new user'
    */
    /* #swagger.parameters['obj'] = {
        in: 'body',
        description: 'User information',
        required: true,
        content: {
            'application/json': {
                schema: { $ref: "#components/schemas/User" }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'User created',
        
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
    } */
    try {
        authController.registerUser(req, res);
    } catch (error) {
        next(new Api500Error('Server error', 500, error.message));
    }

}));

router.get('/', utils.handleErrors((req, res) => {
    res.redirect('auth/oauth2callback');
}));
module.exports = router;