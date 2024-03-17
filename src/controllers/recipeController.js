/***********************************************
 * Recipe Controller
 ***********************************************/
const Recipe = require('../models/recipeModel');
const utils = require('../utils');

// Get all recipes
const getAllRecipes = async (req, res) => {
    const recipes = await Recipe.getRecipes();
    res.status(200).json(recipes);
};

// Get a recipe by ID
const getRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        throw new utils.NotFoundError('Recipe not found');
    }
    res.status(200).json(recipe);
};

// Get recipe by name
const getRecipeByName = async (req, res) => {
    const recipe = await Recipe.findOne({ name: req.params.name });
    if (!recipe) {
        throw new utils.NotFoundError('Recipe not found');
    }
    res.status(200).json(recipe);
};

// Get random recipe
const getRandomRecipe = async (req, res) => {
    const recipes = await Recipe.find();
    const randomIndex = Math.floor(Math.random() * recipes.length);
    res.status(200).json(recipes[randomIndex]);
};

// Create a recipe
const createRecipe = async (req, res) => {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
};

// Update a recipe
const updateRecipe = async (req, res) => {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    if (!recipe) {
        throw new utils.NotFoundError('Recipe not found');
    }
    res.status(200).json(recipe);
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
        throw new utils.NotFoundError('Recipe not found');
    }
    res.status(204).json(null);
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