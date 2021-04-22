const express = require("express");
const router = express.Router();

const { 
    createTransaction,
    fetchTransactions,
//    fetchLastTenTransactions
 } = require("../controllers/transaction");

router.get("/accounts/:account_id/transactions", fetchTransactions);
router.post("/accounts/:account_id/transactions", createTransaction);

//La ruta que sirve
//router.get("/accounts/whatever/transactions", fetchLastTenTransactions);


module.exports = router;
