const { Api500Error } = require('../../utils/errors/apiErrors');
const axios = require('axios');
const colors = require('colors');
const url = require('url');
const { oauth2Client }= require('../../config/auth/oauth');
const people_services = require('googleapis/build/src/apis/people');
const e = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();
const host = process.env.HOST || 'http://localhost:3000';


async function getUserProfile(accessToken) {
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses'; // Example endpoint, adjust based on your needs
    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}


async function oauth2CallbackUtil(req, res) {
    try {
        let queryData = url.parse(req.url, true).query;

        let {tokens} = await oauth2Client.getToken(queryData.code);
        // console.log(tokens);
        
        // Store the tokens in the session
        req.session.tokens = tokens;
        req.session.save();
        // console.log('tokens: ', req.session.tokens);

        await oauth2Client.setCredentials(tokens);
        
        const people = people_services.people({
            version: 'v1',
            auth: oauth2Client
        });
        const me = await people.people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names,photos'
        });

        const data = {
            email: me.data.emailAddresses[0].value, // The user's email address
            name: me.data.names[0].displayName, // The user's display name
            favorite_recipe_books: [], // The user's recipe books
            favorite_recipes: [], // The user's favorite recipes
            authored_books: [], // The user's authored books
            authored_recipes: [], // The user's authored recipes
        }
        try {
            const registerResponse = await axios.post(`${host}/auth/register`, data);
            console.log('registerResponse: ', registerResponse.status);
            if (registerResponse.status === 201 || registerResponse.status === 200) {
                res.set('Cache-Control', 'no-store, must-revalidate');
                res.set('Pragma', 'no-cache');
                res.set('Expires', '0');
                res.redirect('/api-docs');
            } else {
                let error = new Api500Error('An error occurred', 500, 'An error occurred while registering the user');
                throw error; 
            }

        } catch(error) {
            if (error.response && error.response.status === 409) {
                // If the status code is 409, the user is already registered
                res.set('Cache-Control', 'no-store, must-revalidate');
                res.set('Pragma', 'no-cache');
                res.set('Expires', '0');
                res.redirect('/api-docs');
            }
        }
    } catch(error) {
        if ( error.message === 'invalid_grant') {
            // Redirect the user back to the authorization URL
            console.log('Redirecting to authorization URL');
            res.redirect("/auth/oauth2callback");
        } else {
            // Handle other errors
            console.error("An error occured at src/utils/oauth.js at oauth2CallbackUtil".red, error);
            res.status(500).send('An error occurred');
        }
    }
}

async function logout(req, res) {
    let access_token;
    // console.log(req.session);
    if (req.session && req.session.tokens) {
        access_token = req.session.tokens.access_token;
    } else {
        throw new Error('No tokens found in session');
    }
    //Server side logout
    if (req.session) {
        console.log('Destroying session', req.session);
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

        res.clearCookie('connect.sid', { path: '/' });
        res.send('Logout successful');
    } else {
        throw new Error('Error revoking token');
    }
}
module.exports = {
    getUserProfile,
    oauth2CallbackUtil,
    logout,
};


