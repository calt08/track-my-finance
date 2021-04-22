const express = require("express");
const router = express.Router();

// Import Middlewares
const verifyToken = require("../middlewares/verify-token");

// Global Middlewares
router.use(verifyToken);

const { fetchTransactions, deleteTransaction } = require("../controllers/transaction");

router.get("", fetchTransactions);
router.delete("/:id", deleteTransaction);

module.exports = router;
