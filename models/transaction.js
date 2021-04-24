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
    type: Number,
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

  const amount = transaction.amount;

  switch (transaction.type) {
    case "income":
      account.amount = parseFloat(account.amount) + parseFloat(amount);
      break;
    case "expense":
      account.amount = parseFloat(account.amount) - parseFloat(amount);
      break;
    default:
      throw new Error("undefined transaction type");
  }

  await account.save();
});

transactionSchema.pre("remove", async function () {
  const transaction = this;
  const account = await Accounts.findById(transaction.accountID);

  const amount = transaction.amount;

  switch (transaction.type) {
    case "income":
      account.amount = parseFloat(account.amount) - parseFloat(amount);
      break;
    case "expense":
      account.amount = parseFloat(account.amount) + parseFloat(amount);
      break;
    default:
      throw new Error("undefined transaction type");
  }

  await account.save();
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
