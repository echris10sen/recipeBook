const {body, validationResult} = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const validate = {};

// Validate book
validate.addBookRules = () => {
    return [
        body('name')
        .isString()
        .withMessage('Name must be a string'),

        body('author')
        .isString()
        .withMessage('Author must be a string'),

        body('authorId')
        .custom(ObjectId.isValid)
        .withMessage('Author ID must be a valid ObjectId'),

        body('recipes')
        .isArray()
        .withMessage('Recipes must be an array')
        .bail()
        .custom((value) => {
            return value.every((recipe) => {
                return ObjectId.isValid(recipe);
            });
        })
        .withMessage('Recipes must be an array of ObjectIds'),
    ]
};

validate.validateBook = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({[err.param]: err.msg}));
    return res.status(400).json({
        errors: extractedErrors,
    });
};

module.exports = validate;