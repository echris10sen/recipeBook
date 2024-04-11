/****************************
 * Book Model
 ***************************/
const client = require('../config/mongodbConnect');
const { Api400Error, Api404Error, Api500Error } = require('../utils/errors/apiErrors');
const { ObjectId, MongoNetworkError } = require('mongodb');

const collection = 'books';

// Get all books
const getBooks = async () => {
    try {
        const db = client.db();
        const books = await db.collection(collection).find().toArray();
        return books;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Books not found');
        }
    }
};

// Get a book by ID
const getBook = async (id) => {
    try {
        const db = client.db();
        const book = await db.collection(collection).findOne({ _id: new ObjectId(id) });
        return book;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Book not found');
        }
    }
};

// Create a book
const createBook = async (book) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).insertOne(book);
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('Book not created');
        }
    }
};

// Update a book
const updateBook = async (id, book) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).findOneAndUpdate({ _id: new ObjectId(id) }, { $set: book }, { returnOriginal: false });
        return result;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api400Error('Book not updated');
        }
    }
};

// Delete a book
const deleteBook = async (id) => {
    try {
        const db = client.db();
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount;
    } catch (error) {
        if (error instanceof MongoNetworkError) {
            throw new Api500Error('Internal server error');
        } else {
            throw new Api404Error('Book not deleted');
        }
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};