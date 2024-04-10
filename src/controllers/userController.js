/*********************************
 * User Controller
 ********************************/
const User = require('../models/userModel');
const recipeController = require('./recipeController');
const bookController = require('./bookController');
const { Api404Error } = require('../utils/errors/apiErrors');
const utils = require('../utils');

// Get a user by ID
const getProfile = async (req, res, next) => {
   try {
    console.log('req.params.id: ', req.query.id);
    const user = await User.getUser(req.query.id);
    if (!user) {
        throw new Error('User not found', 404);
    }
    res.status(200).json(user);
    } catch (error) {
        console.log('error: ', error);
        next(new Api404Error(error.message));
    }
};
// Update a user
const updateProfile = async (req, res, next) => {
    const user = await User.updateProfile(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
    console.log('user: ', user);
    if (!user) {
        next(new Api404Error('User not found'));
    }
    res.status(200).json(user);
}

// Delete a user
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.getUser(req.query.id);
        if (!user) {
            throw(new Api404Error('User not found'));
        }
        await User.deleteUser(req.query.id);
        res.status(200).send('User deleted');
    } catch (error) {
        next(error);
    }
}

// Get user's recipe books
const getBooks = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    res.status(200).json(user.books);
}

// Create a recipe book
const createBook = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const book = await bookController.createBook(req.body);
    user.books.push(book);
    await user.save();
    res.status(201).json(book);
}

// Update a recipe book
const updateBook = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const book = await bookController.updateBook(req.body);
    user.books.push(book);
    await user.save();
    res.status(200).json(book);
}

// Delete a recipe book
const deleteBook = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const book = await bookController.deleteBook(req.params.id);
    user.books.pull(book);
    await user.save();
    res.status(204).json();
}

// Get user's recipes
const getRecipes = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    res.status(200).json(user.recipes);
}

// Create a recipe
const createRecipe = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const recipe = await recipeController.createRecipe(req.body);
    user.recipes.push(recipe);
    await user.save();
    res.status(201).json(recipe);
}

// Update a recipe
const updateRecipe = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const recipe = await recipeController.updateRecipe(req.body);
    user.recipes.push(recipe);
    await user.save();
    res.status(200).json(recipe);
}

// Delete a recipe
const deleteRecipe = async (req, res) => {
    const user = await User.findById(req.params.userid);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    const recipe = await recipeController.deleteRecipe(req.params.id);
    user.recipes.pull(recipe);
    await user.save();
    res.status(204).json();
}

module.exports = {
    getProfile,
    updateProfile,
    deleteUser,
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe
};