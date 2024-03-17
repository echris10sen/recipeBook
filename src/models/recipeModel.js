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

// Create a recipe
const createRecipe = async (recipe) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(recipe);
    return result.ops[0];
};

// Update a recipe
const updateRecipe = async (id, recipe) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: ObjectId(id) }, { $set: recipe }, { returnOriginal: false });
    return result.value;
};

// Delete a recipe
const deleteRecipe = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
};

module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe
};

