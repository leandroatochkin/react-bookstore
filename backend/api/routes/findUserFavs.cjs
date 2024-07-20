const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');
const {Int32} = require('mongodb')

router.get('/find_user_favs', async (req, res) => {
    const db = await getDb();
    const { ids } = req.query;
   
    try {
        const int32Ids = ids.split(',').map(id => new Int32(parseInt(id, 10)));
      const fav_books = await db.collection('books_database').find({
        id: {
            $in: int32Ids
        }
      }).toArray();
      res.json(fav_books);
    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router