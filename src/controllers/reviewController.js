/*************************************
 * Review Controller
 * ***********************************/
const Review = require('../models/reviewModel');
const utils = require('../utils');
const { Api404Error, Api400Error } = require('../utils/errors/apiErrors');

// Get all reviews
const getReviews = async (req, res, next) => {
    try{
        const reviews = await Review.getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        throw new Api404Error('Reviews not found');
    }
};

// Get a review by ID
const getReview = async (req, res, next) => {
    try {
        const review = await Review.getReview(req.params.id);
        if (!review) {
            throw new Api404Error(`Review with ID ${req.params.id} not found`);
        }
        res.status(200).json(review);
    } catch (error) {
        next(error);
    }
};

// Create a review
const createReview = async (req, res, next) => {
    try {
        console.log(req.body);
        const review = await Review.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

// Update a review
const updateReview = async (req, res, next) => {
    try {
        const review = await Review.updateReview(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!review) {
            throw new Api404Error('Review not updated');
        }
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
}

// Delete a review
const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.deleteReview(req.params.id);
        if (!review) {
            throw new Api400Error('Review not deleted');
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};