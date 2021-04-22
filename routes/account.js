const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

// Routes
const {
  createAccount,
  fetchAccountByID,
  fetchAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/account");

const {
  createTransaction,
  fetchTransactionsByAccountID,
} = require("../controllers/transaction");

router.post("", createAccount);
router.get("", fetchAccounts);
router.get("/:id", fetchAccountByID);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

router.post("/:account_id/transactions", createTransaction);
route.get("/:account_id/transactions", fetchTransactionsByAccountID);

module.exports = router;
