/***************************************************************************
 * Book Controller
 ***************************************************************************/
const Book = require('../models/bookModel');
const utils = require('../utils');
const { Api404Error, Api400Error } = require('../utils/errors/apiErrors');

// Get all books
const getBooks = async (req, res, next) => {
    try{
        const books = await Book.getBooks();
        res.status(200).json(books);
    } catch (error) {
        next(error);
    }
};

// Get a book by ID
const getBook = async (req, res, next) => {
    try {
        const book = await Book.getBook(req.params.id);
        if (!book) {
            throw new Api404Error(`Book with ID ${req.params.id} not found`);
        }
        res.status(200).json(book);
    } catch (error) {
        next(error);
    }
};

// Create a book
const createBook = async (req, res, next) => {
    try {
        console.log(req.body);
        const book = await Book.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }

};

// Update a book
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.updateBook(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!book) {
            throw new Api400Error('Book not updated');
        }
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
}

// Delete a book
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.deleteBook(req.params.id);
        if (book === 0) {
            throw new Api400Error('Book not deleted');
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};