require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.static('public'));
app.use(express.json()); 

app.use(cors());
app.use(bodyParser.json());

const YOUR_DOMAIN = process.env.FRONT_END_DOMAIN; 

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100), // Price in cents
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
app.listen(4242, () => console.log('Running on port 4242'));
