const mongoose = require("mongoose");
const transactionSchema = require("./transaction");

const accountTypes = ["general", "cash", "credit card", "savings"];

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    lowercase: true,
    enum: accountTypes,
    default: accountTypes[0],
  },
  currency: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

accountSchema.pre("findOneAndDelete", async function (next) {
  const query = this;
  const id = query._conditions._id;

  try {
    await transactionSchema.deleteMany({ userID: id });
  } catch (err) {
    throw new Error("Failed deleting account dependencies.");
  }

  next();
});

const Account = mongoose.model("account", accountSchema);

module.exports = Account;
