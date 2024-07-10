const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');


router.get('/books_database', async (req, res) => {
    const db = await getDb();
    try {
      const books = await db.collection('books_database').find().toArray();
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router