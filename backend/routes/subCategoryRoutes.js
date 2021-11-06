const express = require("express");
const { createSubCategory, getSubcategories, deleteSubCategory } = require("../controller/subCategoryController");
const router = express.Router();

router.route("/").post(createSubCategory);
router.route("/:categoryId").get(getSubcategories);
router.route("/:subcategoryId").delete(deleteSubCategory);

module.exports = router