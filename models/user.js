const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require("bcryptjs");
const transactionSchema = require("./transaction");
const accountSchema = require("./account");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("unable to login");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("findByIdAndDelete", async function (next) {
  const query = this;
  const _id = query._conditions._id;

  try {
    await transactionSchema.findByIdAndDelete(_id);
    await accountSchema.findByIdAndDelete(_id);
  } catch (err) {
    throw new Error("failed deleting user");
  }

  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
