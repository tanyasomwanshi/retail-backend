const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory stores
const store = {
  products: [],
  customers: [],
  orders: []
};

// make store available in routes
app.locals.store = store;

// Routes
app.use('/products', require('./routes/products'));
app.use('/customers', require('./routes/customers'));
app.use('/orders', require('./routes/orders'));

// health endpoint (CI/CD uses this)
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;
