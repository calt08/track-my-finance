const mongoose = require("mongoose");

const accountTypes = ["General", "Cash", "Credit card", "Savings"];

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
		required: true,
  },
  type: {
    type: String,
    enum: accountTypes,
		default: accountTypes[0],
  },
  currency: {
    type: String,
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
		required: true,
		default: 0,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
		required: true,
  },
});

const Account = mongoose.model("account", accountSchema);

module.exports = Account;
