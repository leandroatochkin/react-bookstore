const express = require('express');
const router = express.Router();
const { getDb } = require('../db.cjs');
const { ObjectId } = require('bson');

// Ensure the app uses express.json() middleware to parse JSON request bodies
router.use(express.json());

router.put('/user/:id', async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { username, name, address, city, country, phone, picture } = req.body;
  const objectId = new ObjectId(id)
  console.log(objectId)

  try {


    // Only update fields that are provided
    const updateFields = {};
    
      const existingUser = await db.collection('user_database').findOne({ username });
      if (existingUser) {
        return res.status(400).send({ message: 'Username already exists' });
      }
      updateFields.username = username;
    

    if (name) updateFields.name = name;
    if (address) updateFields.address = address;
    if (city) updateFields.city = city;
    if (country) updateFields.country = country;
    if (phone) updateFields.phone = phone;
    if (picture) updateFields.picture = picture;

    const updatedUser = await db.collection('user_database').findOneAndUpdate(
      { _id: objectId },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Error updating user', error: error.message });
  }
});

module.exports = router;
