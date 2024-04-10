const { body, validationResult } = require('express-validator');
const authModel = require('../../models/authModel');

function updateProfileValidationRules(req, res, next) {
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
                throw new Error('Email already exists', 422);
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

validateUpdateProfile= async (req, res, next) => {
    const { email, name, favorite_recipe_books, favorite_recipes, authored_books, authored_recipes } = req.body;
    let errors = []
    errors = validationResult(req);
    console.log('errors: ', errors);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.send({ errors: extractedErrors });
}

module.exports = {
    updateProfileValidationRules,
    validateUpdateProfile
};