const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { genSalt, hash, compare } = require("bcryptjs");

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

const login = async (req, res) => {
  //Checking if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("Please provide a valid Email and password.");
  //Checking password
  const validPass = await compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("Please provide a valid Email and password.");

  //Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).header("Authorization", token).send(token);
};

module.exports = {
  createUser,
  deleteUser,
  fetchUserByID,
  login,
};
