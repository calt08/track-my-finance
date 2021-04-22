const express = require("express");
const router = express.Router();

const { fetchTransactions } = require("../controllers/transaction");

router.get("", fetchTransactions);

module.exports = router;
