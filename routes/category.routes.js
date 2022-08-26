const express = require("express");
const router = express.Router();

const {
  postCategory,
  getCategory,
} = require("../controllers/category.controller");

router.post("/add", postCategory);
router.get("/get/:id", getCategory);

module.exports = router;
