const express = require("express");
const router = express.Router();

const { 
    fetchLastTenTransactions
 } = require("../controllers/transaction");


router.get("", fetchLastTenTransactions);


module.exports = router;
