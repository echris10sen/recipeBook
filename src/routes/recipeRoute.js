// Desc: Recipe route
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const utils = require('../utils');

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
        console.log("GET /");
        recipeController.getAllRecipes(req, res);
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
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        recipeController.getRecipe(req, res);
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
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */

    try {
        recipeController.searchRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));
router.get('/random', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['Recipe']
        #swagger.description = 'Get a random recipe'
    */
   /* #swagger.responses[200] = {
        description: 'Random recipe found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */

    try {
        recipeController.getRandomRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

// Post
router.post('/', utils.handleErrors((req, res, next) => {
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
        recipeController.createRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

// Put
router.put('/:id', utils.handleErrors((req, res, next) => {
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
                schema: { }
            }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe updated',
        schema: { }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        recipeController.updateRecipe(req, res);
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
    /* #swagger.responses[200] = {
        description: 'Recipe deleted',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        recipeController.deleteRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

/************************************
 * User Recipe Routes
 * **********************************/
router.get('/:userid', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Get user's liked recipes'
    */
    /* #swagger.responses[200] = {
        description: 'Recipes found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipes not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.getRecipes(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.get('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Get user's liked recipes by ID'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.getRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.get('/:user/search/:name', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Search for user's liked recipes by name'
        #swagger.parameters['name'] = { 
            in: 'path',
            description: 'Recipe name' 
            required: true
            type: 'string'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipes found',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipes not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.searchRecipes(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.post('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Like a recipe'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Recipe data',
        required: true,
        content: {
            'application/json': {
                schema: { }
            }
        }
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe liked',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.likeRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.put('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Update a liked recipe'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe updated',
        schema: { }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid input',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.updateRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

router.delete('/:userid/:id', utils.handleErrors((req, res, next) => {
    /* #swagger.tags = ['User', 'Recipe']
        #swagger.description = 'Unlike a recipe'
        #swagger.parameters['id'] = { 
            in: 'path',
            description: 'Recipe ID' 
            required: true
            type: 'integer'
    } */
    /* #swagger.responses[200] = {
        description: 'Recipe unliked',
        schema: { }
    } */
    /* #swagger.responses[404] = {
        description: 'Recipe not found',
        schema: { }
    } */
    /* #swagger.responses[500] = {
        description: 'Server error',
        schema: { }
    } */
    try {
        userController.unlikeRecipe(req, res);
    } catch (error) {
        // ADD LATER: Error handling
        next(error);
    }
}));

module.exports = router;