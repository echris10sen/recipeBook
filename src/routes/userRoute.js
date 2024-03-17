// Desc: User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const utils = require('../utils');
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
        description: 'Profile found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Profile not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.getProfile(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));
router.get('/settings', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Get user settings'
    */
    /* #swagger.responses[200] = {
        description: 'Settings found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Settings not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.getSettings(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.put('/settings', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User']
        #swagger.description = 'Update user settings'
    */
    /* #swagger.responses[200] = {
        description: 'Settings updated',
        schema: { }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.updateSettings(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

module.exports = router;