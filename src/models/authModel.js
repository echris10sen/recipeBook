const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'users';

const createUser = async (data) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(data);
    console.log('User created: ', result);
    return result;
};

const checkExisingEmail = async (email) => {
    console.log('email: ', email);
    const db = client.db();
    const result = await db.collection(collection).findOne({ email: email });
    console.log('result: ', result);
    if (!result) {
        return false;
    } else {
        return true;
    }
};

module.exports = {
    createUser,
    checkExisingEmail
};