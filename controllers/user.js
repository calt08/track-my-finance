const User = require("../models/user");

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  createUser,
};
