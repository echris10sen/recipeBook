const axios = require('axios');

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
module.exports = {
    getUserProfile
};


