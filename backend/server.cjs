require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoute = require('./api/routes/books.cjs')
const eventsRoute = require('./api/routes/events.cjs')
const usersRoute = require('./api/routes/users.cjs')
const registerRoute = require('./api/routes/register.cjs')
const loginRoute = require('./api/routes/login.cjs')
const checkUserRoute = require('./api/routes/checkUser.cjs')
const updateUserPurchases = require('./api/routes/updateUserPurchases.cjs')
const updateUserRoute = require('./api/routes/updateUser.cjs')
const deleteUserRoute = require('./api/routes/deleteUser.cjs')
const searchBooks = require('./api/routes/searchBooks.cjs')

app.use(express.json()); 
app.use(express.static('public'));
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



app.use('/api/books', bookRoute)
app.use('/api/events', eventsRoute)
app.use('/api/users', usersRoute)
app.use('/api/register', registerRoute)
app.use('/api/login', loginRoute)
app.use('/api/check_user', checkUserRoute)
app.use('/api/purchases', updateUserPurchases)
app.use('/api/user', updateUserRoute)
app.use('/api/delete_user', deleteUserRoute)
app.use('/api/search', searchBooks)




app.listen(4242, () => console.log('Running on port 4242'));
