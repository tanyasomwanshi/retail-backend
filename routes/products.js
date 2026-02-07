const express = require('express');
const router = express.Router();

// GET all
router.get('/', (req, res) => {
  res.json(req.app.locals.store.products);
});

// POST add
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;

  const product = {
    id: Date.now(),
    name,
    price: Number(price),
    stock: Number(stock)
  };

  req.app.locals.store.products.push(product);
  res.json(product);
});

// PUT update
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = req.app.locals.store.products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: 'Not found' });

  const { name, price, stock } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);

  res.json(product);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  req.app.locals.store.products =
    req.app.locals.store.products.filter(p => p.id !== id);

  res.json({ success: true });
});

module.exports = router;
