/*****************************
 * Review Model
 ***************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'reviews';

// Get all reviews
const getReviews = async () => {
    const db = client.db();
    const reviews = await db.collection(collection).find().toArray();
    return reviews;
};

// Get a review by ID
const getReview = async (id) => {
    const db = client.db();
    const review = await db.collection(collection).findOne({ _id: ObjectId(id) });
    return review;
};

// Create a review
const createReview = async (review) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(review);
    return result.ops[0];
};

// Update a review
const updateReview = async (id, review) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: ObjectId(id) }, { $set: review }, { returnOriginal: false });
    return result.value;
};

// Delete a review
const deleteReview = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
};

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};