const express = require("express");
const router = express.Router();

const { 
    createTransaction,
    fetchTransactions
 } = require("../controllers/transaction");

router.post("/accounts/:account_id/transactions", createTransaction);
router.get("/accounts/:account_id/transactions", fetchTransactions);

module.exports = router;
