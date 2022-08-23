const express = require("express");
const router = express.Router();

const { regitsterUser, regitsterUserValidator, loginUser } = require("../controllers/user.controller");

router.post("/regiter", regitsterUserValidator, regitsterUser);
router.post("/login", loginUser);

module.exports = router;
