const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');

router.put('/purchases', async (req, res) => {
  const db = getDb();
  const { id, update } = req.body;

 
  try {
    const result = await db.collection('user_database').updateOne(
      { id: id },
      { $push: { purchases: update } }
    );

    if (result.modifiedCount > 0) {
      // Fetch the updated user document
      const user = await db.collection('user_database').findOne({ id: id });
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
