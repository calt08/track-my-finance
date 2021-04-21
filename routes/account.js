const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

// Routes
const { createAccount, fetchAccountByID, fetchAccounts } = require("../controllers/account");

router.post("",createAccount);
router.get("/:id", fetchAccountByID);
router.get("",fetchAccounts);

module.exports = router;
