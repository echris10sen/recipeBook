/****************************
 * Book Model
 ***************************/
const client = require('../config/mongodbConnect');
const { ObjectId } = require('mongodb');

const collection = 'books';

// Get all books
const getBooks = async () => {
    const db = client.db();
    const books = await db.collection(collection).find().toArray();
    return books;
};

// Get a book by ID
const getBook = async (id) => {
    const db = client.db();
    const book = await db.collection(collection).findOne({ _id: ObjectId(id) });
    return book;
};

// Create a book
const createBook = async (book) => {
    const db = client.db();
    const result = await db.collection(collection).insertOne(book);
    return result.ops[0];
};

// Update a book
const updateBook = async (id, book) => {
    const db = client.db();
    const result = await db.collection(collection).findOneAndUpdate({ _id: ObjectId(id) }, { $set: book }, { returnOriginal: false });
    return result.value;
};

// Delete a book
const deleteBook = async (id) => {
    const db = client.db();
    const result = await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return result.deletedCount;
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};