const express=require("express");
const { createCategory,createSubCategory,getCategories} = require("../controller/categoryController");
const router=express.Router();

router.route("/").post(createCategory);
router.route("/subcategory").post(createSubCategory);
router.route("/").get(getCategories);

module.exports=router