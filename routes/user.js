const express = require("express");
const router = express.Router();
const { registerUser, signInUser } = require("../controllers/user");

router.post("/register", registerUser);
router.post("/signin", signInUser);

module.exports = router;
