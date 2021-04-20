const express = require("express");
const verifyToken = require("../middlewares/verify-token");
const router = express.Router();

const {
  createUser,
  deleteUser,
  fetchUser,
  updateUser,
  login,
} = require("../controllers/user");

router.post("", createUser);
router.get("/", verifyToken, fetchUser);
router.delete("", verifyToken, deleteUser);
router.post("/login", login);
router.put("", verifyToken, updateUser);

module.exports = router;
