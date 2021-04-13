const mongoose = require("mongoose");

const transactionTypes = ["income", "expense"];
const transactionCategories = [
  "income",
  "transportation",
  "vehicle",
  "housing",
  "food & drinks",
  "shopping",
  "entertainment",
];

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: transactionTypes,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    enum: transactionCategories,
    required: true,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  accountID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  note: {
    type: String,
  },
});

const Transaction = mongoose.Model("transaction", transactionSchema);

module.exports = Transaction;