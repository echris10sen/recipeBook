/********************************************************
 * Auth Controller
 ********************************************************/
const { google } = require('googleapis');
const axios = require('axios');
const dotenv = require('dotenv');
const authModel = require('../models/authModel');
const { oauth2CallbackUtil } = require('../utils/auth/oauth');
const url = require('url');
const { MongoNetworkError } = require('mongodb');
dotenv.config();

async function oauth2Callback(req, res) {
    oauth2CallbackUtil(req, res);
}

async function registerUser(req, res) {
    try {
        const data = req.body;
        console.log('data: ', data);
        const user = await authModel.createUser(data);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            res.status(500).send('An error occurred while registering user');
        } else if (error.message === 'User already exists') {
            res.status(409).send('User already exists');
        } else {
            res.status(400).send('User not created');
        }
    }
}


module.exports = {
    oauth2Callback,
    registerUser
};