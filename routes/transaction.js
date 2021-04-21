const express = require("express");
const router = express.Router();

const { 
    createTransaction,
    fetchTransactions,
    fetchLastTenTransactions,
    deleteTransaction
 } = require("../controllers/transaction");

router.post("/accounts/:account_id/transactions", createTransaction);
router.get("/accounts/:account_id/transactions", fetchTransactions);
router.get("/accounts/:account_id/lastTenTransactions", fetchLastTenTransactions);
router.delete("/transactions/:id", deleteTransaction);

module.exports = router;
