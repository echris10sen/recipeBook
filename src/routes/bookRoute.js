//Description: Book routes
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userController = require('../controllers/userController');
const utils = require('../utils');

/************************************
 * General Book Routes
 * **********************************/
router.get('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Get all books'
    */
    /* #swagger.responses[200] = {
        description: 'Books found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Books not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        bookController.getBooks(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.get('/:id', utils.handleErrors((req, res, next) => { 
    /* #swagger.tags = ['Book']
        #swagger.description = 'Get a book by ID'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Book ID',
            required: true,
            type: 'integer'
        }
    */
    /* #swagger.responses[200] = {
        description: 'Book found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Book not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        bookController.getBook(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.post('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Create a book'
    */
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Book data',
        required: true,
        content: {
            'application/json': {
                schema: { }
            }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'Book created',
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
        bookController.createBook(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

/************************************
 * User Recipe Book Routes
 * **********************************/
router.get('/:userid', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Book']
        #swagger.description = 'Get user's recipe books'
    */
    /* #swagger.responses[200] = {
        description: 'Recipe books found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe books not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.getBooks(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));


router.post('/:userid', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Book']
        #swagger.description = 'Create a recipe book'
    */
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Book data',
        required: true,
        content: {
            'application/json': {
                schema: { }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'Recipe book created',
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
        userController.createBook(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.put('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Book']
        #swagger.description = 'Update a posted recipe book'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Book ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe book updated',
        schema: { }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Book not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.updateBook(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.delete('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Book']
        #swagger.description = 'Delete a recipe book'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Book ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe book deleted',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Book not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.deleteBook(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

module.exports = router;