const authModel = require('../../models/authModel');
const { body, validationResult } = require('express-validator');
// Ensure Session

function ensureSession(req, res, next) {
    console.log('req.session: ', req.session);
    console.log('req.session.id: ', req.session.id);
    if (req.session.tokens && req.session.id && req.session) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
    next();
}

function registerUserValidationRules(req, res, next) {
    return [
        body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address')
        .custom(async (account_email) => {
            console.log('inside custom function')
            const emailExists = await authModel.checkExisingEmail(account_email)
            console.log('account_email: ', account_email);
            console.log('emailExists: ', emailExists);
            console.log('emailExists === account_email: ', emailExists === account_email);
            if (emailExists) {
                throw new Error('Email already exists');
            }
        }),
        body('name')
        .trim()
        .isLength({ min: 5 }),
        body('favorite_recipe_books')
        .isArray(),
        body('favorite_recipes')
        .isArray(),
        body('authored_books')
        .isArray(),
        body('authored_recipes')
        .isArray()
        
    ];
}

validateRegisterUser = async (req, res, next) => {
    const { email, name, favorite_recipe_books, favorite_recipes, authored_books, authored_recipes } = req.body;
    let errors = []
    errors = validationResult(req);
    console.log('errors: ', errors);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(409).send("That email is already registered");
}

module.exports = {
    ensureSession,
    registerUserValidationRules,
    validateRegisterUser
};