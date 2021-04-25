const Account = require("../models/account");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const validations = require("../validations/account");

const createAccount = async (req, res) => {
  const account = new Account({ ...req.body, userID: res.locals.user });
  try {
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const fetchAccounts = async (req, res) => {
  const userID = res.locals.user;

  const accounts = await Account.find({ userID });

  if (!accounts) {
    return res.status(400).send({ status: 400, message: "accounts not found" });
  }

  const netAssets = await User.getNetAssets(userID._id);
  accountsWithNetAssets = { accounts: accounts, netAssets };
  res.status(200).send(accountsWithNetAssets);
};

const fetchAccountByID = async (req, res) => {
  const id = req.params.id;

  try {
    const account = await Account.findById(id);

    if (!account) {
      return res
        .status(400)
        .send({ status: 400, message: "account not found" });
    }

    res.status(200).send(account);
  } catch (err) {
    res.status(500).send();
  }
};

const deleteAccount = async (req, res) => {
  const id = req.params.id;

  try {
    await Transaction.deleteTransactionsByAccountID(id);
    const deletedAccount = await Account.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .send({ message: "Account was deleted", deletedAccount });
  } catch (err) {
    res.status(400).send({ status: 400, message: "Account not found." });
  }
};

const updateAccount = async (req, res) => {
  const id = req.params.id;

  if (!validations.areUpdatesAllowed(req.body)) {
    return res.status(400).send({ status: 400, message: "invalid updates" });
  }

  const updates = Object.keys(req.body);

  try {
    const account = await Account.findById(id);

    if (!account) {
      return res
        .status(404)
        .send({ status: 400, message: "account not found" });
    }

    updates.forEach((update) => {
      account[update] = req.body[update];
    });

    await account.save();

    res.status(200).send(account);
  } catch (err) {
    res.status(400).send({ status: 400, message: err });
  }
};

module.exports = {
  createAccount,
  fetchAccounts,
  fetchAccountByID,
  deleteAccount,
  updateAccount,
};
