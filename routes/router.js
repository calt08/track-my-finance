const express = require("express");

const router = express.Router();

// Import Routes
const userRoute = require("./user");
const accountRoute = require("./account");
const transactionRoute = require("./transaction");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

// Routes middlewares
router.use("/users", userRoute);
router.use("/accounts", accountRoute);
router.use("/transactions", transactionRoute);
router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = router;
