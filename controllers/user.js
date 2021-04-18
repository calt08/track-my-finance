const User = require("../models/user");
const validations = require("../validations/user");

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
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const updateUserByID = async (req, res) => {
  const id = req.params.id;

  if (!validations.areUpdatesAllowed(req.body)) {
    return res.status(400).send({ status: 400, message: "invalid updates" });
  }

  const updates = Object.keys(req.body);

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ status: 400, message: "user not found" });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ status: 400, message: err });
  }
};

module.exports = {
  createUser,
  deleteUser,
  fetchUserByID,
  updateUserByID,
};
