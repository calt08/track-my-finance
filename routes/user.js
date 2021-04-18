const express = require("express");
const router = express.Router();

const { createUser, deleteUser, fetchUserByID } = require("../controllers/user");

router.post("/users", createUser);
router.get("/users/:id", fetchUserByID);
router.delete("/users/:id", deleteUser);

module.exports = router;
