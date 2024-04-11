const client = require('../config/mongodbConnect');
const { ObjectId, MongoNetworkError } = require('mongodb');

const collection = 'users';

const createUser = async (data) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).insertOne(data);
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('User not created');
        }
    }
};

const checkExisingEmail = async (email) => {
    try {
        const db = client.db();
        const user = await db.collection(collection).findOne({ email: email });
        return user;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('User not found');
        }
    }
};

module.exports = {
    createUser,
    checkExisingEmail
};