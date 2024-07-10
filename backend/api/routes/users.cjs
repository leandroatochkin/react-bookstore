const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');

router.get('/users_database', async (req, res) => {
    const db = await getDb();

    if (!db) {
      console.error("Failed to get database instance");
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const events = await db.collection('users_database').find().toArray();
      res.json(events);
    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = router