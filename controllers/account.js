const Account = require("../models/account");
const User = require("../models/user");

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

  try {
    const accounts = await Account.find({ userID });

    if (!accounts) {
      return res
        .status(400)
        .send({ status: 400, message: "accounts not found" });
    }

    res.status(200).send(accounts);
  } catch (err) {
    res.status(500).send();
  }
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
    const deletedAccount = await User.findOneAndDelete({ _id: id });

    if (!deletedAccount) {
      return res
        .status(400)
        .send({ status: 400, message: "Account not found." });
    }
    return res
      .status(200)
      .send({ message: "Account was deleted", deletedAccount });
  } catch (err) {
    res.status(500).send();
  }
};

const updateAccount = async (req, res) => {
  const id = req.params.id;

  if (!validations.areUpdatesAllowed(req.body)) {
    return res.status(400).send({ status: 400, message: "invalid updates" });
  }

  const updates = Object.keys(req.body);

  try {
    const account = await User.findById(id);

    if (!account) {
      return res
        .status(404)
        .send({ status: 400, message: "account not found" });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
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
