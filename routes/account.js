const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

// Routes
const { createAccount } = require("../controllers/account");

router.post("/", createAccount);

module.exports = router;
