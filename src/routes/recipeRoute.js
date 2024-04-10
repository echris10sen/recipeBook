// Desc: Recipe route
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const recipeValidation = require('../utils/validation/recipeValidation');
const utils = require('../utils');
const { Api500Error } = require('../utils/errors/apiErrors');

// Middleware

/************************************
 * General Recipe Routes
 * **********************************/
// Get
router.get('/', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Get all recipes'
    */
    /* #swagger.responses[200] = {
        description: 'Recipes found'
    } */
    /* #swagger.responses[404] = {
        description: 'Recipes not found'
    } */
    /* #swagger.responses[500] = {
        description: 'Server error'
    } */
    try {
        recipeController.getAllRecipes(req, res, next);
    } catch (error) {
        next(error);
    }    
}));

router.get('/random', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Get a random recipe'
    */
   /* #swagger.responses[200] = {
        description: 'Random recipe found',
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',

    } */

    try {
        recipeController.getRandomRecipe(req, res, next);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.get('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Get a recipe by its ID'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe found',
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
    } */
    try {
        recipeController.getRecipe(req, res, next);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));
router.get('/search/:name', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Search for a recipe by its name'
        #swagger.parameters['name'] = { 
            in: 'path',
            description: 'Recipe name' 
            required: true
            type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe found',
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
    } */

    try {
        recipeController.getRecipeByName(req, res, next);
    } catch (error) {
        next(error);
    }
}));

// Post
router.post('/',
    recipeValidation.addRecipeRules(),
    recipeValidation.validateRecipe,
    utils.handleErrors((req, res, next) => {
        /* #swagger.tags = ['Recipe']
            #swagger.description = 'Create a new recipe'
        */
        /* #swagger.requestBody = {
            description: 'Recipe information',
            required: true,
            content: {
                'application/json': {
                    schema: { $ref: "#components/schemas/Recipe" }
                }
            }
        } */
        /* #swagger.responses[201] = {
            description: 'Recipe created',
        } */
        /* #swagger.responses[400] = {
            description: 'Invalid input',
        } */
        /* #swagger.responses[500] = {
            description: 'Server error',
        } */

        try {
            recipeController.createRecipe(req, res);
        } catch (error) {
            // ADD LATER: Error handling
            next(error);
        }
}
));

// Put
router.put('/:id',
    recipeValidation.addRecipeRules(),
    recipeValidation.validateRecipe,
    utils.handleErrors((req, res, next) => {
        /* #swagger.tags = ['Recipe']
            #swagger.description = 'Update a recipe'
            #swagger.parameters['id'] = { 
                in: 'path',
                description: 'Recipe ID' 
                required: true
                type: 'integer'
        } */
        /* #swagger.requestBody = {
            description: 'Recipe information',
            required: true,
            content: {
                'application/json': {
                    schema: { $ref: "#components/schemas/Recipe" }
                }
            }
        } */
        /* #swagger.responses[201] = {
            description: 'Recipe updated',

        } */
        /* #swagger.responses[400] = {
            description: 'Invalid input',

        } */
        /* #swagger.responses[404] = {
            description: 'Recipe not found',

        } */
        /* #swagger.responses[500] = {
            description: 'Server error',

        } */
        try {
            recipeController.updateRecipe(req, res, next);
        } catch (error) {
            // ADD LATER: Error handling
            next(error);
        }
}));

// Delete
router.delete('/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Delete a recipe'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[204] = {
        description: 'Recipe deleted',
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
    } */
    try {
        recipeController.deleteRecipe(req, res, next);
    } catch (error) {
        next(error);
    }
}));

module.exports = router;