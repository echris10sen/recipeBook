const {body, validationResult} = require('express-validator');
const validate = {};

// Validate recipe
validate.addRecipeRules = () => {
    return [
        body('name')
        .isString()
        .withMessage('Name must be a string'),

        body('ingredients')
        .isArray()
        .withMessage('Ingredients must be an array'),
    
        body('instructions')
        .isArray()
        .withMessage('Instructions must be an array'),
    
        body('cookTime')
        .isNumeric()
        .withMessage('Cook time must be a number'),
    
        body('prepTime')
        .isNumeric()
        .withMessage('Prep time must be a number'),
    
        body('servings')
        .isNumeric()
        .withMessage('Servings must be a number'),
    
        body('category')
        .isString()
        .withMessage('Category must be a string'),
    
        body('allergyInfo')
        .isString()
        .withMessage('Allergy info must be a string'),
    
        body('nutritionInfo')
        .isString()
        .withMessage('Nutrition info must be a string'),
    ]
};

// Validate book
validate.addBookRules = () => {
    return [
        body('name')
        .isString()
        .withMessage('Name must be a string'),

        body('recipes')
        .isArray()
        .withMessage('Recipes must be an array'),
    ]
};

// Validate review
validate.addReviewRules = () => {
    return [
        body('rating')
        .isNumeric()
        .withMessage('Rating must be a number'),

        body('comment')
        .isString()
        .withMessage('Comment must be a string'),
    ]
};

// Validate functions
validate.validateRecipe = (req, res, next) => {
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

validate.validateReview = (req, res, next) => {
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