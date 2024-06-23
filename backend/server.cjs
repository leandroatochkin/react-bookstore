require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.static('public'));
app.use(express.json()); 
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());



const uri = process.env.MONGO_DB_CONNECTION;
const YOUR_DOMAIN = process.env.FRONT_END_DOMAIN; 

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('book_store'); // Replace with your database name
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit process with a failure code
  }
}

connectToMongoDB();







app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: parseInt((item.price * 100).toFixed(0)), // Price in cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: YOUR_DOMAIN,
    cancel_url: YOUR_DOMAIN,
  });

  res.json({ id: session.id });
});

/*----------------MONGODB--------------*/

app.get('/books_database', async (req, res) => {
  try {
    const books = await db.collection('books_database').find().toArray();
    res.json(books);
  } catch (error) {
    console.error("Failed to fetch data from MongoDB", error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(4242, () => console.log('Running on port 4242'));
