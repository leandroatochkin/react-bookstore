const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');
const { ObjectId } = require('bson')

router.put('/purchases', async (req, res) => {
  const db = getDb();
  const { id, update } = req.body;
 
  const objectId = new ObjectId(id)
 
  try {
    const result = await db.collection('user_database').updateOne(
      { _id: objectId},
      { $push: { purchases: update } }
    );

    if (result.modifiedCount > 0) {
      // Fetch the updated user document
      const user = await db.collection('user_database').findOne({ _id: objectId });
      return res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user purchases', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
