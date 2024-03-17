// Desc Review routes
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const utils = require('../utils');

/************************************
 * General Review Routes
 * **********************************/
router.get('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Get all reviews'
    */
    /* #swagger.responses[200] = {
        description: 'Reviews found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Reviews not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        reviewController.getReviews(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.get('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Get a review by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Review ID',
            required: true,
            type: 'integer'
        }
    */
    /* #swagger.responses[200] = {
        description: 'Review found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Review not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        reviewController.getReview(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.post('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Create a new review'
    */
    /* #swagger.responses[201] = {
        description: 'Review created',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        reviewController.createReview(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.put('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Update a review'
    */
    /* #swagger.responses[200] = {
        description: 'Review updated',
        schema: { }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Review not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        reviewController.updateReview(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.delete('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Delete a review'
    */
    /* #swagger.responses[200] = {
        description: 'Review deleted',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Review not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        reviewController.deleteReview(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

module.exports = router;