const User = require("../models/user");
const Account = require("../models/account");
const validations = require("../validations/user");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const user = new User(req.body);

  //Checking the DB to see if the email is taken
  const emailTaken = await User.findOne({ email: req.body.email });
  if (emailTaken)
    return res.status(409).send({
      status: 409,
      message: "Another user has been created with that Email Adress",
    });

  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

const fetchUser = async (req, res) => {
  const userID = res.locals.user;

  try {
    const user = await User.findById(userID);

    if (!user)
      return res.status(404).send({ status: 404, message: "user not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const id = res.locals.user;

  try {
    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).send({ status: 404, message: "user not found" });
    }

    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
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
      return res.status(404).send({ status: 404, message: "user not found" });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ status: 500, message: err });
  }
};

const login = async (req, res) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  if (!user)
    return res.status(400).send("Please provide a valid Email or password.");

  //Assign Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.status(200).header("Authorization", token).send({ token, user });
};

module.exports = {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
  login,
};
