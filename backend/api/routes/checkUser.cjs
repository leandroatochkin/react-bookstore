const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');


router.get('/check_user/:email', async (req, res) => {
    const db = getDb();
    const { email } = req.params;
  
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
