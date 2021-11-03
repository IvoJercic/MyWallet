const express=require("express");
const { createCategory,createSubCategory,getCategories,getSubcategories} = require("../controller/categoryController");
const router=express.Router();

router.route("/").post(createCategory);
router.route("/").get(getCategories);
router.route("/:categoryName").get(getSubcategories);
router.route("/subcategory").post(createSubCategory);

// router.route("/").get(getCategories);
// router.route("/subcategoryy").post(getSubcategories);

module.exports=router