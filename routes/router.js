const express = require("express");

const router = express.Router();

// Import Routes
const userRoute = require("./user");
const accountRoute = require("./account");
const transactionRoute = require("./transaction");

// Routes middlewares
router.use("/users", userRoute);
router.use("/accounts", accountRoute);
router.use("/transactions", transactionRoute)

module.exports = router;
