const express=require("express");
const { createSubCategory,getSubcategories} = require("../controller/subCategoryController");
const router=express.Router();

router.route("/").post(createSubCategory);
router.route("/:categoryId").get(getSubcategories);


module.exports=router