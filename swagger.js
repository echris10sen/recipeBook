const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0'});

const doc = {
  info: {
    version: '1.0.0',            // by default: '1.0.0'
    title: 'Recipe Book REST API',              // by default: 'REST API'
    description: 'This Api is used to store recipes and compile them into books'         // by default: ''
  },
  servers: [
    {
        url: 'http://localhost:3000',
        description: "Development server"
    },
    {
        url: 'https://recipebook-9aq5.onrender.com',
        description: "Production server"
    }
  ],            
  tags: [                   // by default: empty Array
    {
      name: 'Book',             // Tag name
      description: 'Endpoints for books'  // Tag description
    },
    {
      name: 'Recipe',             // Tag name
      description: 'Endpoints for recipes'  // Tag description
    },
    {
      name: 'Review',             // Tag name
      description: 'Endpoints for reviews'  // Tag description
    },
    {
      name: 'User',             // Tag name
      description: 'Endpoints for users'  // Tag description
    }
  ],
  components: {
    schemas: {
      Recipe: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          ingredients: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          instructions: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          cookTime: {
            type: 'number'
          },
          prepTime: {
            type: 'number'
          },
          servings: {
            type: 'number'
          },
          category: {
            type: 'string'
          },
          allergyInfo: {
            type: 'string'
          },
          nutritionInfo: {
            type: 'string'
          },
        }  
      }
    },
    Book: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        recipes: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    },
    Review: {
      type: 'object',
      properties: {
        rating: {
          type: 'number'
        },
        comment: {
          type: 'string'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        username: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
  },
};

const outputFile = './src/views/swagger-output.json';
const routes = ['./src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);