const {google} = require('googleapis');
const dotenv = require('dotenv');
const { NULL } = require('mysql/lib/protocol/constants/types');
const { get } = require('mongoose');
dotenv.config();

const credentials = require('./client_secret_local2.json');

const oauth2ClientDev = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
);

const oauth2ClientProd = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const oauth2Client = process.env.NODE_ENV === 'production' ? oauth2ClientProd : oauth2ClientDev;

const generateAuthUrl = () => {
    /**
     * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
     * from the client_secret.json file. To get these credentials for your application, visit
     * https://console.cloud.google.com/apis/credentials.
     */


    // Access scopes for read-only Drive activity.
    const scopes = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
    ];

    // Generate a url that asks permissions for the Drive activity scope
    const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
        * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true
    });
    return authorizationUrl;
};



// const getOAuth2Client = () => {
//    if (!oauth2Client) {
//         console.log('Creating new OAuth2 client');
//         if (process.env.NODE_ENV === 'production') {
//             oauth2Client = new google.auth.OAuth2(
//                 process.env.CLIENT_ID,
//                 process.env.CLIENT_SECRET,
//                 process.env.REDIRECT_URI
//             );
//         } else {
//             const credentials = require('./client_secret_local2.json');
//             console.log(credentials.web.redirect_uris[0]);
//             oauth2Client = new google.auth.OAuth2(
//             credentials.web.client_id,
//             credentials.web.client_secret,
//             credentials.web.redirect_uris[0]
//             );
//         }
//     };
//     console.log('Returning OAuth2 client', oauth2Client);
//     return oauth2Client;
// }

module.exports = {
    generateAuthUrl,
    oauth2Client
};