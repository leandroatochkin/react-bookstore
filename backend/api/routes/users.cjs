const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');
const User = require('../models/userModel.cjs');

router.get('/user_database', async (req, res) => {
    const db = await getDb();

    if (!db) {
      console.error("Failed to get database instance");
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const users = await db.collection('user_database').find().toArray();
      res.json(events);
    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

  router.get('/user', async (req, res) => {
    const db = getDb();
    const { email } = req.query;
  
    try {
      const user = await db.collection('user_database').findOne({ email });
      if (user) {
        return res.status(200).json({ exists: true, user });
      }
      res.status(200).json({ exists: false });
    } catch (error) {
      console.error('Error checking user existence', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  module.exports = router;
