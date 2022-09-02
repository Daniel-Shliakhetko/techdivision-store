const express = require("express");
const router = express.Router();

const {
  postProduct,
  postProductValidator,
  getProduct,
} = require("../controllers/product.controller");

router.post("/add", postProductValidator, postProduct);
router.get("/get/id/:id", getProduct);

module.exports = router;
