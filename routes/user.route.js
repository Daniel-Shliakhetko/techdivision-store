const express = require("express");
const router = express.Router();

const apiPath = "/api";

const { createUser, getUser } = require("../controllers/user.controller");

router.post(apiPath + "/create-user", createUser);
router.get(apiPath + "/get-user", getUser);
