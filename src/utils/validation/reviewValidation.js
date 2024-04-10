const {body, validationResult} = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const validate = {};
// Validate review
validate.addReviewRules = () => {
    return [
        body('rating')
        .isNumeric()
        .withMessage('Rating must be a number'),

        body('comment')
        .isString()
        .withMessage('Comment must be a string'),

        body()
        .custom((body) => {
            if (body.recipeId && !ObjectId.isValid(body.recipeId)) {
                throw new Error('Recipe ID is not valid');
            }
            if (body.bookId && !ObjectId.isValid(body.bookId)) {
                throw new Error('Book ID is not valid');
            }
            return body.recipeId || body.bookId;
        })
        .withMessage('Recipe ID or Book ID is required'),

        body('authorId')
        .custom(ObjectId.isValid)
        .withMessage('User ID is not valid')
    ]
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