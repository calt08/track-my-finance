const Account = require("../models/account");

const createAccount = async (req, res) => {
  const account = new User(req.body);
  try {
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

module.exports = {
  createAccount,
};
