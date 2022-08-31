const express = require("express");
const router = express.Router();

const {
  postProduct,
  getProduct,
} = require("../controllers/product.controller");

router.post("/add", postProduct);
router.get("/get/:id", getProduct);

module.exports = router;
