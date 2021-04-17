const express = require("express");
const router = express.Router();

const { createUser, deleteUser } = require("../controllers/user");

router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
