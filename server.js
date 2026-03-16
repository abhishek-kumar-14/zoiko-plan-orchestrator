const express = require("express");
const plans = require("./plans.json");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all mobile plans
 *     description: Returns all Zoiko mobile plans with optional price filtering
 *     parameters:
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of plans
 *       400:
 *         description: Invalid price value
 *       404:
 *         description: No plans found
 */
app.get("/plans", (req, res) => {
  const { max_price } = req.query;

  let result = plans;

  if (max_price) {
    const price = parseFloat(max_price);

    if (isNaN(price)) {
      return res.status(400).json({
        error: "Invalid max_price value"
      });
    }

    result = plans.filter(plan => plan.price <= price);
  }

  if (result.length === 0) {
    return res.status(404).json({
      message: "No plans found"
    });
  }

  res.json(result);
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
 *         description: Name of the plan
 *     responses:
 *       200:
 *         description: Plan found
 *       400:
 *         description: Name query missing
 *       404:
 *         description: Plan not found
 */
app.get("/plans/search", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      error: "Please provide a plan name"
    });
  }

  const result = plans.filter(plan =>
    plan.name.toLowerCase().includes(name.toLowerCase())
  );

  if (result.length === 0) {
    return res.status(404).json({
      message: "Plan not found"
    });
  }

  res.json(result);
});


/**
 * @swagger
 * /plans/sort:
 *   get:
 *     summary: Sort plans by price
 *     parameters:
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [low-to-high, high-to-low]
 *         required: true
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Sorted plans
 *       400:
 *         description: Invalid sort order
 */
app.get("/plans/sort", (req, res) => {
  const { order } = req.query;

  if (!order) {
    return res.status(400).json({
      error: "Please specify order=low to high or order=high to low"
    });
  }

  if (order !== "low-to-high" && order !== "high-to-low") {
    return res.status(400).json({
      error: "Order must be 'low-to-high' or 'high-to-low'"
    });
  }

  const sortedPlans = [...plans].sort((a, b) => {
    return order === "low-to-high" ? a.price - b.price : b.price - a.price;
  });

  res.json(sortedPlans);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});