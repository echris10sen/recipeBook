// Desc: Authentication route
const axios = require('axios');
const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const url = require('url');
const utils = require('../utils');
const { log } = require('console');
const { oauth2Client, generateAuthUrl }= require('../config/auth/oauth');
const people_services = require('googleapis/build/src/apis/people');


// Middleware
router.get('/oauth2callback', utils.handleErrors(async (req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'OAuth2 Callback'
    */
    try {
        let queryData = url.parse(req.url, true).query;
   
        let {tokens} = await oauth2Client.getToken(queryData.code);
        log(tokens);
        
        // Store the tokens in the session
        req.session.tokens = tokens;
        req.session.save();
        console.log('tokens: ', req.session.tokens);

        await oauth2Client.setCredentials(tokens);
        
        const people = people_services.people({
            version: 'v1',
            auth: oauth2Client
        });
        const me = await people.people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names,photos'
        });
    
        console.log(me.data.names[0].displayName);
        res.set('Cache-Control', 'no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.send('OAuth2 Callback');
    } catch (error) {
        if (error.message === 'invalid_grant') {
            // Redirect the user back to the authorization URL
            const authorizationUrl = generateAuthUrl();
            res.redirect(authorizationUrl);
          } else {
            // Handle other errors
            console.error(error);
            res.status(500).send('An error occurred');
          }
        }
}));
router.get('/login', utils.handleErrors((req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Login'
    */
    res.send('Login');
}));

router.get('/logout', utils.handleErrors(async (req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Logout'
    */
    try {
        let access_token;
        if (req.session && req.session.tokens) {
            access_token = req.session.tokens.access_token;
        } else {
            throw new Error('No tokens found in session');
        }
        //Server side logout
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                    throw new Error('Error destroying session');
                }
            });
        }
        //Client side logout
        const response = await axios.get('https://accounts.google.com/o/oauth2/revoke?token=' + access_token);

        if (response.status === 200) {
            res.clearCookie('session-token');
            res.send('Logout successful');
        } else {
            throw new Error('Error revoking token');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Logout failed');
    }
}));

module.exports = router;