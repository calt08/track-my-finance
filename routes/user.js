const express = require("express");
const router = express.Router();

const { createUser, deleteUser, fetchUserByID, updateUserByID } = require("../controllers/user");

router.post("", createUser);
router.get("/:id", fetchUserByID);
router.delete("/:id", deleteUser);
router.post("/login", login);

module.exports = router;
