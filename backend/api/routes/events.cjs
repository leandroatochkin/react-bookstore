const express = require('express');
const router = express.Router();
const {getDb} = require('../db.cjs');

router.get('/events_database', async (req, res) => {
    const db = await getDb();

    if (!db) {
      console.error("Failed to get database instance");
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      const events = await db.collection('events_database').find().toArray();
      res.json(events);
    } catch (error) {
      console.error("Failed to fetch data from MongoDB", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.post('/events_database/:_id/assist', async (req, res)=>{
  const db = await getDb();
  const eventId = req.params._id
  const { username } = req.body;

  if (!db) {
    console.error("Failed to get database instance");
    res.status(500).send("Internal Server Error");
    return;
  }

  try{
    await db.collection('events_database').updateOne(
      { _id: eventId },
      { $addToSet: { usersAsisting: username } } // Ensure username is added only if not present
    );
    res.status(200).send("User added to the event");
  }
  catch(error){
    console.error("Failed to fetch data from MongoDB", error);
    res.status(500).send("Internal Server Error");
    }
})

  module.exports = router