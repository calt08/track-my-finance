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
  deleteTransaction,
} = require("../controllers/transaction");

router.post("", createAccount);
router.get("", fetchAccounts);
router.get("/:id", fetchAccountByID);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

router.post("/:account_id/transactions", createTransaction);
router.get("/:account_id/transactions", fetchTransactionsByAccountID);
router.delete("/:account_id/transactions/:id", deleteTransaction);

module.exports = router;
