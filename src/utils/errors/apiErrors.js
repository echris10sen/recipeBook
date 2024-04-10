// api404Error.js

const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class Api400Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Bad request.',
        isOperational = true
    ) {
        // The super keyword is used to call corresponding methods of parent class. 
        // This means it's calling the constructor of BaseError with the provided arguments.
        super(name, statusCode, isOperational, description)
    }
}

class Api404Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        // The super keyword is used to call corresponding methods of parent class. 
        // This means it's calling the constructor of BaseError with the provided arguments.
        super(name, statusCode, isOperational, description)
    }
}

class Api500Error extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Internal server error.',
        isOperational = true
    ) {
        // The super keyword is used to call corresponding methods of parent class. 
        // This means it's calling the constructor of BaseError with the provided arguments.
        super(name, statusCode, isOperational, description)
    }
}

module.exports = {
    Api404Error,
    Api400Error,
    Api500Error
}