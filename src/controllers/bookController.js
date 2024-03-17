/***************************************************************************
 * Book Controller
 ***************************************************************************/
const Book = require('../models/bookModel');
const utils = require('../utils');

// Get all books
const getBooks = async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
};

// Get a book by ID
const getBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new utils.NotFoundError('Book not found');
    }
    res.status(200).json(book);
};

// Create a book
const createBook = async (req, res) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
};

// Update a book
const updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    if (!book) {
        throw new utils.NotFoundError('Book not found');
    }
    res.status(200).json(book);
}

// Delete a book
const deleteBook = async (req, res) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
        throw new utils.NotFoundError('Book not found');
    }
    res.status(204).json();
}

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
};