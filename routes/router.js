const express = require("express");

const router = express.Router();

// Import Routes
const transactionsRoute = require("./transactions");
const userRoute = require("./user");
const accountRoute = require("./account");
//const transactionRoute = require("./transaction");


// Routes middlewares
router.use("/transactions", transactionsRoute);
router.use("/users", userRoute);
router.use("/accounts", accountRoute);
//router.use("", transactionRoute);


module.exports = router;
