/***********************************
 * User model
 **********************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'users';

// Get all users
const getUsers = async () => {
    const db = client.db();
    const users = await db.collection(collection).find().toArray();
    return users;
};

// Get a user by ID
const getUser = async (id) => {
    const db = client.db();
    const user = await db.collection(collection).findOne({ _id: ObjectId(id) });
    return user;
};

// Create a user
const createUser = async (user) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(user);
    return result.ops[0];
};

// Update a user
const updateUser = async (id, user) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: ObjectId(id) }, { $set: user }, { returnOriginal: false });
    return result.value;
};

// Delete a user
const deleteUser = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};