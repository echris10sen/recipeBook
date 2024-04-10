const { authorizedbuyersmarketplace } = require('googleapis/build/src/apis/authorizedbuyersmarketplace');

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
              type: 'object',
              properties: {
                ingredient_name: {
                  type: 'string'
                },
                quantity: {
                  type: 'number'
                },
                units: {
                  type: 'string'
                }
              }
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
            type: 'array',
            items: {
              type: 'string'
            }
          },
          allergyInfo: {
            type: 'string'
          },
          nutrition: {
            type: 'object',
            properties: {
              calories: {
                type: 'number'
              },
              fat: {
                type: 'number'
              },
              sugar: {
                type: 'number'
              },
              protein: {
                type: 'number'
              },
              sodium: {
                type: 'number'
              }
            }
          },
          author: {
            type: 'string'
          },
          authorId: {
            type: 'string',
            format: 'ObjectId',
            description: 'The ID of the author of the recipe'
          }
        }  
      },
      Book: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          author: {
            type: 'string'
          },
          authorId: {
            type: 'string',
            format: 'ObjectId',
            description: 'The ID of the author of the book'
          },
          recipes: {
            type: 'array',
            items: {
              type: 'string',
              format: 'ObjectId',
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
          },
          recipeId: {
            type: 'string',
            format: 'ObjectId',
            description: 'The ID of the recipe being reviewed',
          },
          bookId: {
            type: 'string',
            format: 'ObjectId',
            description: 'The ID of the book being reviewed',
          },
          authorId: {
            type: 'string',
            format: 'ObjectId',
            description: 'The ID of the user who wrote the review',
          }
        }
      },
      User: {
        type: 'object',
        properties: {
          $name: {
            type: 'string'
          },
          $email: {
            type: 'string'
          },
          favorite_recipe_books: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          favorite_recipes: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          authored_books: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          authored_recipes: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    },
  },
};

const outputFile = './src/views/swagger-output.json';
const routes = ['./src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);