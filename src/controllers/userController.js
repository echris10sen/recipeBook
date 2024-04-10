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
            throw new Api404Error('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
// Update a user
const updateProfile = async (req, res, next) => {
    try {
        const user = await User.updateProfile(req.query.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) {
            throw new Api404Error('User not updated');
        }
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

// Delete a user
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.getUser(req.query.id);
        if (!user) {
            throw new Api404Error('User not found');
        }
        await User.deleteUser(req.query.id);
        res.status(200).send('User deleted');
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteUser
};