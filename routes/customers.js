const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(req.app.locals.store.customers);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;

  const customer = {
    id: Date.now(),
    name,
    email
  };

  req.app.locals.store.customers.push(customer);
  res.json(customer);
});

module.exports = router;
