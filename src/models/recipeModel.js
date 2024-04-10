/***************************************
 * Recipe Model
 **************************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'recipes';

// Get all recipes
const getRecipes = async () => {
    const db = client.db('App_Data');
    const recipes = await db.collection(collection).find({}).toArray();
    return recipes;
};

// Get a recipe by ID
const getRecipe = async (id) => {
    const db = client.db();
    const recipe = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    return recipe;
};

// Get recipe by name
const getRecipeByName = async (name) => {
    const db = client.db();
    const recipe = await db.collection(collection).findOne( {"name": {$regex: new RegExp(name, "i") } });
    console.log('recipe: ', recipe);
    return recipe;
}

// Create a recipe
const createRecipe = async (recipe) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(recipe);
    return result;
};

// Get random recipe
const getRandomRecipe = async () => {
    const db = client.db();
    const recipe = await db.collection(collection).aggregate([{ $sample: { size: 1 } }]).toArray();
    return recipe[0];
};

// Update a recipe
const updateRecipe = async (id, recipe) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: recipe }, { returnOriginal: false });
    return result.value;
};

// Delete a recipe
const deleteRecipe = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount;
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

