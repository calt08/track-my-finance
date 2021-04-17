const User = require("../models/user");

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const fetchUserByID = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  createUser,
  deleteUser,
  fetchUserByID,
};
