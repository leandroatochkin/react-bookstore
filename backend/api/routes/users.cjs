const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');

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

  module.exports = router