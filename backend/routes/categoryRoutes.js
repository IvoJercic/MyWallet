const express=require("express");
const { createCategory,getCategories} = require("../controller/categoryController");
const router=express.Router();

router.route("/").post(createCategory);
router.route("/:userId").get(getCategories);

module.exports=router