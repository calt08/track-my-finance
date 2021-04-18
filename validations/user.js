const allowedUpdates = ["name", "lastName", "email", "password"];

const areUpdatesAllowed = (body) => {
  const updates = Object.keys(body);

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  return isValidOperation;
};

module.exports = {
  areUpdatesAllowed,
};
