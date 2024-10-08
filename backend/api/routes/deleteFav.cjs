const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');
const {ObjectId} = require('bson')

router.use(express.json());

router.post('/delete_fav', async (req, res) => {
  const db = getDb();
  const { email, book_id } = req.body;

  


  try {
    const result = await db.collection('user_database').updateOne(
      { email: email},
      { $pull: { favs: book_id } }
    );
    console.log(result)
    if (result.modifiedCount === 0) {
      console.log('No document found with that id.');
      res.status(404).json('User not found');
    } else {
      console.log('Favorite deleted');
      res.status(200).json('Favorite deleted successfully');
    }
  } catch (error) {
    console.error('Failed to update MongoDB', error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
