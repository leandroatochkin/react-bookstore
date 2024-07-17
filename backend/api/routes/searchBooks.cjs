// routes/books.js
const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');

router.get('/search', async (req, res) => {

const db = getDb()
  try {
    const { title, author, genre } = req.query;
    const query = {};

    if (title) {
      query.name = { $regex: new RegExp(title, 'i') }; // Case-insensitive regex search
    }
    if (author) {
      query.author = { $regex: new RegExp(author, 'i') }; // Case-insensitive regex search
    }
    if (genre) {
      query.genre = { $regex: new RegExp(genre, 'i') }; // Case-insensitive regex search
    }

    const books = await db.collection('books_database').find(query).toArray();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
