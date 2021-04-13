const mongoose = require("mongoose");
const validator = require("validator").default;
const bcrypt = require("bcryptjs");

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
      if (validator.isEmail(value)) {
        throw new Error("invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: 7,
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email});

	if (!user) {
		throw new Error("unable to login");
	}

	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		throw new Error("unable to login");
	}

	return user;
}

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.Model("user", userSchema);

module.exports = User;
