const express=require("express");
const { createCategory,getCategories,deleteCategory} = require("../controller/categoryController");
const router=express.Router();

router.route("/").post(createCategory);
router.route("/:userId").get(getCategories);
router.route("/:categoryId").delete(deleteCategory);

module.exports=router