const User = require("../models/user");
const Account = require("../models/account");
const validations = require("../validations/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const user = new User(req.body);

  //Checking the DB to see if the email is taken
  const emailTaken = await User.findOne({ email: req.body.email });
  if (emailTaken)
    return res.status(400).send({
      status: 400,
      message: "Another user has been created with that Email Adress",
    });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
};

const fetchUser = async (req, res) => {
  const userID = res.locals.user;

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    const userObject = user.toObject();
    const netAssets = await User.getNetAssets(userID._id);
    userWithNetAssets = { ...userObject, netAssets };
    res.status(200).json(userWithNetAssets);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req, res) => {
  const id = res.locals.user;

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(400).send({ status: 400, message: "user not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  const id = res.locals.user;

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

const login = async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  if (!user)
    return res.status(400).send("Please provide a valid Email and password.");

  //Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).header("Authorization", token).send({ token });
};

module.exports = {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
  login,
  getUserNetAssets,
};
