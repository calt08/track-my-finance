const Account = require("../models/account");

const createAccount = async (req, res) => {
  res.send(res.locals.user);
  const account = new Account({ ...req.body, userID: res.locals.user });
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
