const express = require("express");
const {
  register, deleteUser , login , logout , updateUser
} = require("../controller/user.ctrl");

const { authMiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

// reg
router.post("/register", register);
// login
router.post("/login", login);
// logout
router.post("/logout", logout);
// update
router.put("/update",authMiddleware, updateUser);
// delete
router.delete("/delete", authMiddleware, deleteUser);

module.exports = router;
