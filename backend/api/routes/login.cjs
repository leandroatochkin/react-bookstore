const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');
const argon = require('argon2');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = await getDb()
    try {
      const user = await db.collection('user_database').findOne({ email });
  
      if (!user) {
        return res.status(400).json('Invalid username or password');
      }
  
      const isPasswordMatch = await argon.verify(user.password, password);
  
      if (!isPasswordMatch) {
        return res.status(400).json('Invalid username or password');
      }
  
      res.status(200).json(
        {   
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email,
                name: user.name,
                phone: user.phone,
                address: user.address,
                city: user.city,
                country: user.country,
                purchases: user.purchases,
                settings: user.settings
              }
        }
      );

    } catch (error) {
      console.error('Error logging in user', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router