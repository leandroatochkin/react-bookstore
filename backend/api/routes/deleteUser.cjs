const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');


router.delete('/delete_user/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { ObjectId } = require('bson'); // Import ObjectId from bson

   try{
    const objectId = new ObjectId(id); // Convert the id to ObjectId
    const deletedUser = await db.collection('user_database').deleteOne(
      { _id: objectId }, // Query object to find the user by ID
    )
    res.status(200).json(deletedUser);
   }

// Send the updated user document
   catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
