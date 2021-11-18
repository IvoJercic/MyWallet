const express = require("express");
const { createSubCategory, getSubcategories, deleteSubCategory ,updateSubCategory,getSubcategoriesForUser} = require("../controller/subCategoryController");
const router = express.Router();

router.route("/").post(createSubCategory);
router.route("/:categoryId").get(getSubcategories);
router.route("/:subcategoryId").delete(deleteSubCategory);
router.route("/:subcategoryId").put(updateSubCategory);
router.route("/all/:userId").get(getSubcategoriesForUser);
module.exports = router