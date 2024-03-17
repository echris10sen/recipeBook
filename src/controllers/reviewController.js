/*************************************
 * Review Controller
 * ***********************************/
const Review = require('../models/reviewModel');
const utils = require('../utils');

// Get all reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find();
    res.status(200).json(reviews);
};

// Get a review by ID
const getReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        throw new utils.NotFoundError('Review not found');
    }
    res.status(200).json(review);
};

// Create a review
const createReview = async (req, res) => {
    const review = await Review.create(req.body);
    res.status(201).json(review);
};

// Update a review
const updateReview = async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    if (!review) {
        throw new utils.NotFoundError('Review not found');
    }
    res.status(200).json(review);
}

// Delete a review
const deleteReview = async (req, res) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
        throw new utils.NotFoundError('Review not found');
    }
    res.status(204).json();
}

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
};