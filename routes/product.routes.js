const express = require("express");
const router = express.Router();

const {
  postProduct,
  postProductValidator,
  getProduct,
  getProducts,
} = require("../controllers/product.controller");

router.post("/add", postProductValidator, postProduct);
router.get("/get/id/:id", getProduct);
router.get("/get-products", getProducts);

module.exports = router;
