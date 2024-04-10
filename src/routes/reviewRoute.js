// Desc Review routes
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const reviewValidation = require('../utils/validation/reviewValidation');
const utils = require('../utils');
const { Api500Error } = require('../utils/errors/apiErrors');

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
        reviewController.getReviews(req, res, next);
    } catch (error) {
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
        reviewController.getReview(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.post('/', 
    reviewValidation.addReviewRules(), 
    reviewValidation.validateReview,
    utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Create a new review'
    */
   /* #swagger.parameters['Review'] = {
        in: 'body',
        description: 'Review data',
        required: true,
        type: 'object',
        content: {
            'application/json': {
                schema: { $ref: "#/components/schemas/Review" }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'Review created',
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
    } */
    try {
        reviewController.createReview(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.put('/:id',
    reviewValidation.addReviewRules(),
    reviewValidation.validateReview,
    utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Update a review'
    */
    /* #swagger.responses[201] = {
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
        reviewController.updateReview(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.delete('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Review']
        #swagger.description = 'Delete a review'
    */
    /* #swagger.responses[204] = {
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
        reviewController.deleteReview(req, res, next);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

module.exports = router;