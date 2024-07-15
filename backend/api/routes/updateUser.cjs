const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');


router.put('/user/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { username, name, address, city, country, phone, picture } = req.body;
  const { ObjectId } = require('bson'); // Import ObjectId from bson

  try {
    const existingUser = await db.collection('user_database').findOne({
       username 
    });

    if (existingUser) {
      res.status(400).send('Username already exists');
      return;
    }
    const objectId = new ObjectId(id); // Convert the id to ObjectId
    const updatedUser = await db.collection('user_database').findOneAndUpdate(
      { _id: objectId }, // Query object to find the user by ID
      {
        $set: {
          username, 
          name,
          address,
          city,
          country,
          phone,
          picture,
        }
      },
      { returnDocument: 'after' } // Return the updated document
    );

    if (!updatedUser) { // Check if the user was found and updated
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(updatedUser); // Send the updated user document
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Error updating user', error: error.message });
  }
});

module.exports = router;
