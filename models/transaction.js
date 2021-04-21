const mongoose = require("mongoose");
const Accounts = require("./account");

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

transactionSchema.post("save", async function () {
  const transaction = this;
  const account = await Accounts.findById(transaction.accountID);
  account.amount = account.amount + transaction.amount;
  account.save();
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
