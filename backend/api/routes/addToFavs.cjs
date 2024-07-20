const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');
const {ObjectId} = require('bson')

router.use(express.json());

router.post('/add_to_favs', async (req, res) => {
  const db = getDb();
  const { user_id, book_id } = req.body;

  const objectId = new ObjectId(user_id)

 
  console.log(`Adding book ${book_id} to user ${user_id}'s favorites`);

  try {
    const result = await db.collection('user_database').updateOne(
      { _id:  objectId},
      { $push: { favs: book_id } }
    );
    console.log(result)
    if (result.modifiedCount === 0) {
      console.log('No document found with that id.');
      res.status(404).json('User not found');
    } else {
      console.log('Book added to favorites');
      res.status(200).json('Favorite added successfully');
    }
  } catch (error) {
    console.error('Failed to update MongoDB', error);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
