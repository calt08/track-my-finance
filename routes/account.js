const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

// Routes
const { createAccount, fetchAccountByID, fetchAccounts } = require("../controllers/account");

const transactionRoute = require("./transaction");

router.post("",createAccount);
router.get("/:id", fetchAccountByID);
router.get("",fetchAccounts);
router.use("/:account_id/transactions", transactionRoute);

module.exports = router;
