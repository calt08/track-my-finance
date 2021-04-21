const express = require("express");
const router = express.Router();

const {
    createTransaction
} = require("../controllers/transaction")



router.post("/accounts/:account_id/transactions", createTransaction);

module.exports = router;