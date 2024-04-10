// Desc: User routes
const express = require('express');
const router = express.Router();
const userValidation = require('../utils/validation/userValidation');
const userController = require('../controllers/userController');
const utils = require('../utils');
const { Api400Error, Api404Error, Api500Error } = require('../utils/errors/apiErrors');
const { route } = require('./api-docs');

// Middleware
router.get('/', utils.handleErrors((req, res, next) => {
    res.redirect('/profile');
}));

/************************************
 * User Routes
 * **********************************/
router.get('/profile', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Get user profile'
    */
    /* #swagger.responses[200] = {
        description: 'Profile found'
    } */
    /* #swagger.responses[404] = {
        description: 'Profile not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        userController.getProfile(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.put('/profile',
userValidation.updateProfileValidationRules(),
userValidation.validateUpdateProfile,
utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Update user profile'
    */
    /* #swagger.responses[201] = {
        description: 'Profile updated'
    } */
    /* #swagger.responses[404] = {
        description: 'Profile not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        userController.updateProfile(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.delete('/profile', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Delete user profile'
    */
    /* #swagger.responses[204] = {
        description: 'Profile deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Profile not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        userController.deleteUser(req, res, next);
    } catch (error) {
        next(error);
    }
}));

module.exports = router;