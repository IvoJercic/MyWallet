const express=require("express");
const { createCategory,getCategories,deleteCategory,updateCategory} = require("../controller/categoryController");
const router=express.Router();

router.route("/").post(createCategory);
router.route("/:userId").get(getCategories);
router.route("/:categoryId").delete(deleteCategory);
router.route("/:categoryId").put(updateCategory);


module.exports=router