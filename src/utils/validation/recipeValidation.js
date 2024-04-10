const {body, validationResult} = require('express-validator');
const { ObjectId } = require('mongoose').Types;

const validate = {};

// Validate recipe
validate.addRecipeRules = () => {
    return [
        body('name')
        .isString()
        .withMessage('Name must be a string'),

        body('ingredients')
        .isArray()
        .bail()
        .withMessage('Ingredients must be an array')
        .custom((value) => {
            return value.every((ingredient) => {
                return typeof ingredient === 'object' && 
                ingredient !== null && 
                typeof ingredient.ingredient_name === 'string' && 
                typeof ingredient.quantity === 'number' &&
                typeof ingredient.units === 'string';
            });
        }
        ).withMessage('Ingredients must be an array of objects with name, quantity, and units'),
    
        body('instructions')
        .isArray()
        .withMessage('Instructions must be an array')
        .bail()
        .custom((value) => {
            return value.every((instruction) => {
                return typeof instruction === 'string';
            });
        }
        ).withMessage('Instructions must be an array of strings'),
    
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
        .isArray()
        .withMessage('Category must be an array')
        .bail()
        .custom((value) => {
            return value.every((category) => {
                return typeof category === 'string';
            });
        }
        ).withMessage('Category must be an array of strings'),
    
        body('allergy_information')
        .isArray()
        .withMessage('Allergy info must be an array')
        .bail()
        .custom((value) => {
            return value.every((allergy) => {
                return typeof allergy === 'string';
            });
        }
        ).withMessage('Allergy info must be an array of strings'),
        
    
        body('nutrition')
        .isObject()
        .withMessage('Nutrition info must be a string')
        .bail()
        .custom((value) => {
            return typeof value === 'object' && 
            value !== null && 
            typeof value.calories === 'number' && 
            typeof value.fat === 'number' &&
            typeof value.sugar === 'number' &&
            typeof value.protein === 'number' &&
            typeof value.sodium === 'number';
        }
        ).withMessage('Nutrition info must be an object with calories, fat, sugar, protein, and sodium'),

        body('author')
        .isString()
        .withMessage('Author must be a string'),

        body('authorId')
        .custom(ObjectId.isValid)
        .withMessage('Author ID must be a valid ObjectId'),
    ]
};

// Validate functions
validate.validateRecipe = async (req, res, next) => {
    let errors = [];
    errors = validationResult(req);
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