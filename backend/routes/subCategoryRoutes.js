const express = require("express");
const { createSubCategory, getSubcategories, deleteSubCategory ,updateSubCategory} = require("../controller/subCategoryController");
const router = express.Router();

router.route("/").post(createSubCategory);
router.route("/:categoryId").get(getSubcategories);
router.route("/:subcategoryId").delete(deleteSubCategory);
router.route("/:subcategoryId").put(updateSubCategory);

module.exports = router