const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

const {
  fetchTransactions,
  fetchTransactionByID,
  deleteTransaction,
} = require("../controllers/transaction");

router.get("", fetchTransactions);
router.get("/:id", fetchTransactionByID);
router.delete("/:id", deleteTransaction);

module.exports = router;
