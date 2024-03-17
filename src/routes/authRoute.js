// Desc: Authentication route
const express = require('express');
const router = express.Router();
// const authController = require('../controllers/authController');
const utils = require('../utils');

// Middleware
router.get('/login', utils.handleErrors((req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Login'
    */
    res.send('Login');
}));

router.get('/logout', utils.handleErrors((req, res) => {
    /* #swagger.tags = ['Auth']
        #swagger.description = 'Logout'
    */
    res.send('Logout');
}));

module.exports = router;