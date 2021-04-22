const express = require("express");
const router = express.Router();

const { 
    createTransaction,
    fetchTransactions,
    fetchLastTenTransactions
 } = require("../controllers/transaction");

router.post("/accounts/:account_id/transactions", createTransaction);
router.get("/accounts/:account_id/transactions", fetchTransactions);
router.get("/accounts/whatever/lastTenTransactions", fetchLastTenTransactions);

module.exports = router;
