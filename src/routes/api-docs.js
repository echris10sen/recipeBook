// Desc: API documentation route
const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../views/swagger-output.json');

// Middleware
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Export
module.exports = router;