const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(req.app.locals.store.orders);
});

router.post("/", (req, res) => {
  const { items, customerId } = req.body;

  const store = req.app.locals.store;

  let total = 0;
  let orderItems = [];

  for (let id of items) {
    const product = store.products.find((p) => p.id === id);

    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ error: "Out of stock" });
    }

    product.stock -= 1;
    total += product.price;

    orderItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  const order = {
    id: Date.now(),
    items: orderItems,
    total,
    customerId,
    status: "PLACED",
    date: new Date().toISOString(),
  };

  store.orders.push(order);

  res.json(order);
});

module.exports = router;
