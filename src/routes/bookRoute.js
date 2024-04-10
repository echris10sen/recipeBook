//Description: Book routes
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const bookValidation = require('../utils/validation/bookValidation');
const userController = require('../controllers/userController');
const utils = require('../utils');
const { Api500Error } = require('../utils/errors/apiErrors');

/************************************
 * General Book Routes
 * **********************************/
router.get('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Get all books'

    */
    /* #swagger.responses[200] = {
        description: 'Books found'
    } */
    /* #swagger.responses[404] = {
        description: 'Books not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        bookController.getBooks(req, res, next);
    } catch (error) {
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
        bookController.getBook(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.post('/', 
bookValidation.addBookRules(),
bookValidation.validateBook,
utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Create a book'
    */
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Book data',
        required: true,
        content: {
            'application/json': {
                schema: { $ref: "#/components/schemas/Book" }
            }
        }
    } */
    /* #swagger.responses[201] = {
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
        bookController.createBook(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.put('/:id',
bookValidation.addBookRules(),
bookValidation.validateBook,
utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Update a book'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Book ID',
            required: true,
            type: 'integer'
        }
    */
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Book data',
        required: true,
        content: {
            'application/json': {
                schema: { $ref: "#/components/schemas/Book" }
            }
        }
    } */
    /* #swagger.responses[201] = {
        description: 'Book updated',
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
        bookController.updateBook(req, res, next);
    } catch (error) {
        next(error);
    }
}));

router.delete('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Book']
        #swagger.description = 'Delete a book'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'Book ID',
            required: true,
            type: 'integer'
        }
    */
    /* #swagger.responses[204] = {
        description: 'Book deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Book not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        bookController.deleteBook(req, res, next);
    } catch (error) {
        next(error);
    }
}));

module.exports = router;