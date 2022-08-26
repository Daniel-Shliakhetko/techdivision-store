const express = require("express");
const router = express.Router();

const { regitsterUser, regitsterUserValidator, loginUser } = require("../controllers/auth.controller");

router.post("/register",regitsterUserValidator, regitsterUser);
router.post("/login", loginUser);

module.exports = router;
