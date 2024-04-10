/***********************************
 * User model
 **********************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'users';

// Get a user by ID
const getUser = async (id) => {
    const db = client.db();
    const user = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    return user;
};

// Create a user
const createUser = async (user) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(user);
    return result.ops[0];
};

// Update a profile
const updateProfile= async (id, user) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: user }, { returnOriginal: false });
    return result;
};

// Delete a user
const deleteUser = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result;
};

module.exports = {
    getUser,
    createUser,
    updateProfile,
    deleteUser
};