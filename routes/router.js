const express = require("express");

const router = express.Router();

// Import Routes
userRoute = require("./user");

// Routes moddlewares
router.use("/user", userRoute);

module.exports = router;
