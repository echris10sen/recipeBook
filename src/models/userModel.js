/***********************************
 * User model
 **********************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');
const { MongoNetworkError } = require('mongodb');

const collection = 'users';

// Get a user by ID
const getUser = async (id) => {
    try {
        const db = client.db();
        const user = await db.collection(collection).findOne({ _id: new ObjectId(id) });
        return user;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('User not found');
        }
    }
};

// Create a user
const createUser = async (user) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).insertOne(user);
        return result;
    } catch {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('User not created');
        }
    }
};

// Update a profile
const updateProfile= async (id, user) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: user }, { returnOriginal: false });
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('User not updated');
        }
    }
};

// Delete a user
const deleteUser = async (id) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('User not deleted');
        }
    }
};

module.exports = {
    getUser,
    createUser,
    updateProfile,
    deleteUser
};