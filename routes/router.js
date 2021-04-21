const express = require("express");

const router = express.Router();

// Import Routes
const userRoute = require("./user");
const accountRoute = require("./account");

// Routes middlewares
router.use("/users", userRoute);
router.use("/accounts", accountRoute);

module.exports = router;
