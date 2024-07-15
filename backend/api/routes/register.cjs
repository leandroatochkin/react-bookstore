const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');
const argon = require('argon2');


router.post('/register', async (req, res) => {
    const db = await getDb();

    const {username, password, email, name, phone, address, city, country, picture, terms, purchases, settings} = req.body

    if (!db) {
      console.error("Failed to get database instance");
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
        const existingUser = await db.collection('user_database').findOne({
            $or: [{ username }, { email }]
          });
      
          if (existingUser) {
            res.status(400).send('Username or email already exists');
            return;
          }
        const hashPass = await argon.hash(password)
        const newUser = {username, password: hashPass, email, name, phone, address, city, country, terms, purchases, settings}
        await db.collection('user_database').insertOne(newUser)
        res.status(201).json('User registered successfully');

    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

  module.exports = router