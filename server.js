const express = require("express");
const plans = require("./plans.json");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Zoiko Plan API is running. Visit /api-docs for documentation.");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans or filter by price
 *     parameters:
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of plans
 */
app.get("/plans", (req, res) => {
  const maxPrice = req.query.max_price;

  if (maxPrice) {
    const filtered = plans.filter(plan => plan.price <= maxPrice);

    if (filtered.length === 0) {
      return res.status(404).json({ message: "No plans found under this price" });
    }

    return res.json(filtered);
  }

  res.json(plans);
});

/**
 * @swagger
 * /plans/search:
 *   get:
 *     summary: Search plan by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Plan name
 *     responses:
 *       200:
 *         description: Plan found
 */
app.get("/plans/search", (req, res) => {
  const name = req.query.name;

  if (!name) {
    return res.status(400).json({ error: "Plan name is required" });
  }

  const plan = plans.find(p =>
    p.name.toLowerCase() === name.toLowerCase()
  );

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" });
  }

  res.json(plan);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api-docs`);
});