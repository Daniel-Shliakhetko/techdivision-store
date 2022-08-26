const express = require("express");
const router = express.Router();

const {
  postCategory,
  getCategory,
  getCategoryByPath,
  getCategoryChlidrens,
  getCategoryParent
} = require("../controllers/category.controller");

router.post("/add", postCategory);
router.get("/get/id/:id", getCategory);
router.get(
  ["/get/:parent/childrens", "/get/:parent/:children/childrens"],
  getCategoryChlidrens
);
router.get(
    ["/get/:parent/parent", "/get/:parent/:children/parent"],
    getCategoryParent
  );
router.get(
  ["/get/path/:parent", "/get/path/:parent/:children"],
  getCategoryByPath
);

module.exports = router;
