/***********************************************
 * Recipe Controller
 ***********************************************/
const Recipe = require('../models/recipeModel');
const utils = require('../utils');
const { Api404Error } = require('../utils/errors/apiErrors');

// Get all recipes
const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.getRecipes();
    res.status(200).json(recipes);
};

// Get a recipe by ID
const getRecipe = async (req, res, next) => {
    try {
    const recipe = await Recipe.getRecipe(req.params.id);
    if (!recipe) {
        throw new Api404Error('Recipe not found');
    }
    res.status(200).json(recipe);
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
};

// Get recipe by name
const getRecipeByName = async (req, res, next) => {
    try{
        console.log('req.params.name: ', req.params.name);
        const recipe = await Recipe.getRecipeByName({ name: req.params.name });
        if (!recipe) {
            throw new Api404Error('404');
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
};

// Get random recipe
const getRandomRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.getRandomRecipe();
        if (!recipe) {
            throw new Api404Error('No recipes found');
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log('error: ', error);
        next(error);
    }
};

// Create a recipe
const createRecipe = async (req, res, next) => {
    const data = req.body;
    const recipe = await Recipe.createRecipe(data);
    res.status(201).json(recipe);
};

// Update a recipe
const updateRecipe = async (req, res, next) => {
    try{
        const recipe = await Recipe.updateRecipe(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
        if (!recipe) {
            throw new Api404Error('Recipe not found');
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.deleteRecipe(req.params.id);
        if (!recipe) {
            throw new Api404Error('Recipe not found');
        }
        res.status(204).json(null);
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    getRecipeByName,
    getRandomRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};