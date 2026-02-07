const request = require("supertest");
const app = require("../app");

describe("Retail API Tests", () => {
  test("endpoint works", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("Create product", async () => {
    const res = await request(app).post("/products").send({
      name: "Phone",
      price: 1000,
      stock: 3,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Phone");
  });

  test("Get products list", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Create order reduces stock", async () => {
    // create product first
    const p = await request(app)
      .post("/products")
      .send({ name: "Tablet", price: 500, stock: 2 });

    const productId = p.body.id;

    // create order
    const order = await request(app)
      .post("/orders")
      .send({ items: [productId] });

    expect(order.statusCode).toBe(200);
    expect(order.body.total).toBe(500);

    // check stock reduced
    const list = await request(app).get("/products");
    const product = list.body.find((x) => x.id === productId);

    expect(product.stock).toBe(1);
  });
});
