const express = require("express");

const router = express.Router();

// Import Routes
userRoute = require("./user");
accountRoute = require("./account");

// Routes moddlewares
router.use("/users", userRoute);
router.use("/accounts", accountRoute);

module.exports = router;
