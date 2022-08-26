const express = require("express");
const router = express.Router();

const { getUser,deleteUser } = require("../controllers/user.controller");

router.get("/get/:id", getUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
