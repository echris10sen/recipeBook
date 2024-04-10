/********************************************************
 * Auth Controller
 ********************************************************/
const { google } = require('googleapis');
const axios = require('axios');
const dotenv = require('dotenv');
const authModel = require('../models/authModel');
const { oauth2CallbackUtil } = require('../utils/auth/oauth');
const url = require('url');
dotenv.config();

async function oauth2Callback(req, res) {
    oauth2CallbackUtil(req, res);
}

async function registerUser(req, res) {
    const data = req.body;
    console.log('data: ', data);
    const user = await authModel.createUser(data);
    res.status(201).json(user);
}


module.exports = {
    oauth2Callback,
    registerUser
};