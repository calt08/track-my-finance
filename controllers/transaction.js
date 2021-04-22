const Transaction = require("../models/transaction");

const createTransaction = async (req, res) => {
  const transaction = new Transaction({
    ...req.body,
    accountID: req.params.account_id,
    userID: res.locals.user,
  });

  try {
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const fetchTransactionsByAccountID = async (req, res) => {
  const accountID = req.params.account_id;
  const userID = res.locals.user;

  try {
    const transactions = await Transaction.find({ accountID, userID });

    if (!transactions) {
      return res
        .status(400)
        .send({ status: 400, message: "transactions not found" });
    }

    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send();
  }
};

const fetchTransactions = async (req, res) => {
  const userID = res.locals.user;

  try {
    const transactions = await Transaction.find({ userID })
      .sort("-date")
      .limit(10);

    if (!transactions) {
      return res
        .status(400)
        .send({ status: 400, message: "transactions not found" });
    }

    res.status(200).send(transactions);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  createTransaction,
  fetchTransactionsByAccountID,
  fetchTransactions,
};
