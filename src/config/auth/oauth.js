const {google} = require('googleapis');
const dotenv = require('dotenv');
dotenv.config();

const oauth2ClientDev = new google.auth.OAuth2(
        process.env.DEV_CLIENT_ID,
        process.env.DEV_CLIENT_SECRET,
        process.env.DEV_REDIRECT_URI
);

const oauth2ClientProd = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
);

const oauth2Client = process.env.NODE_ENV === 'production' ? oauth2ClientProd : oauth2ClientDev;

const generateAuthUrl = () => {
    console.log('oauth2Client: ', oauth2Client);
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

module.exports = {
    generateAuthUrl,
    oauth2Client
};