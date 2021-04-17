const express = require("express");

const router = express.Router();

// Import Routes
userRoute = require("./user");
accountRoute = require("./account");

// Routes moddlewares
router.use("/user", userRoute);
router.use("/account", accountRoute);

module.exports = router;
