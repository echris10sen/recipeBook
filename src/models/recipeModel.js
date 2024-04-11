/***************************************
 * Recipe Model
 **************************************/
const client = require('../config/mongodbConnect');
const { ObjectId, MongoNetworkError } = require('mongodb');
const { Api400Error, Api404Error, Api500Error } = require('../utils/errors/apiErrors');
const collection = 'recipes';

// Get all recipes
const getRecipes = async () => {
    try {
        const db = client.db();
        const recipes = await db.collection(collection).find().toArray();
        return recipes;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Recipes not found');
        }
    }
};

// Get a recipe by ID
const getRecipe = async (id) => {
    try {
        const db = client.db();
        const recipe = await db.collection(collection).findOne({ _id: new ObjectId(id) });
        console.log(recipe);
        return recipe;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Recipe not found');
        }
    }
};

// Get recipe by name
const getRecipeByName = async (name) => {
    try {
        const db = client.db();
        const recipe = await db.collection(collection).findOne(name);
        return recipe;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Recipe not found');
        }
    }
}

// Create a recipe
const createRecipe = async (recipe) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).insertOne(recipe);
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('Recipe not created');
        }
    }
};

// Get random recipe
const getRandomRecipe = async () => {
    try {
        const db = client.db();
        const recipe = await db.collection(collection).aggregate([{ $sample: { size: 1 } }]).toArray();
        return recipe[0];
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Recipe not found');
        }
    }
};

// Update a recipe
const updateRecipe = async (id, recipe) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: recipe }, { returnOriginal: false });
        return result.value;
    } catch {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('Recipe not updated');
        }
    }
};

// Delete a recipe
const deleteRecipe = async (id) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Recipe not found');
        }
    }
};

module.exports = {
    getRecipes,
    getRecipe,
    getRecipeByName,
    getRandomRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};

