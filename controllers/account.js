const Account = require("../models/account");

const createAccount = async (req, res) => {
  const account = new Account({ ...req.body, userID: res.locals.user });
  try {
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
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

module.exports = {
  createAccount,
  deleteAccount,
};
