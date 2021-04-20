const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

// Routes
const { createAccount, deleteAccount } = require("../controllers/account");

router.post("/", createAccount);
router.delete("/", deleteAccount);

module.exports = router;
