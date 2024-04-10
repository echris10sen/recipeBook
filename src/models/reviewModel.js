/*****************************
 * Review Model
 ***************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');
const { Api400Error, Api404Error, Api500Error } = require('../utils/errors/apiErrors');
const { MongoNetworkError } = require('mongodb');

const collection = 'reviews';

// Get all reviews
const getReviews = async () => {
    try {
        const db = client.db();
        const reviews = await db.collection(collection).find().toArray();
        return reviews;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        }
        throw new Api404Error('Reviews not found');
    }
};

// Get a review by ID
const getReview = async (id) => {
    try {
        const db = client.db();
        const review = await db.collection(collection).findOne({ _id: new ObjectId(id) });
        console.log(review);
        return review;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        }
        throw new Api404Error('Review not found');
    }
};

// Create a review
const createReview = async (review) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).insertOne(review);
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        }
        throw new Api400Error('Review not created');
    }
};

// Update a review
const updateReview = async (id, review) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: review }, { returnOriginal: false });
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        }
        throw new Api400Error('Review not updated');
    }
};

// Delete a review
const deleteReview = async (id) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        }
        throw new Api404Error('Review to be deleted not found');
    }
};

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};