/*********************************
 * User Controller
 ********************************/
const User = require('../models/userModel');
const recipeController = require('./recipeController');
const bookController = require('./bookController');
const utils = require('../utils');

// Get all users
const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

// Get a user by ID
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    res.status(200).json(user);
};

// Create a user
const createUser = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
};

// Update a user
const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    res.status(200).json(user);
}

// Delete a user
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        throw new utils.NotFoundError('User not found');
    }
    res.status(204).json();
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
    getUsers,
    getUser,
    createUser,
    updateUser,
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