const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require("bcryptjs");
const Transaction = require("./transaction");
const Account = require("./account");

const ObjectId = mongoose.Types.ObjectId;

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
  if (!user) return;

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return;

  return user;
};

userSchema.statics.getNetAssets = async (userID) => {
  const value = await Account.aggregate([
    { $match: { userID: ObjectId(userID) } },
    {
      $group: {
        _id: "$userID",
        countAccounts: { $sum: 1 },
        total: { $sum: "$amount" },
      },
    },
  ]);
  if (value.length === 0) {
    return 0;
  }

  return value[0].total;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("findOneAndDelete", async function (next) {
  const query = this;
  const id = query._conditions._id;

  try {
    await Account.deleteMany({ userID: id });
    await Transaction.deleteMany({ userID: id });
  } catch (err) {
    throw new Error("Failed deleting user dependencies.");
  }

  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
