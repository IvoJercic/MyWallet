const express=require("express");
const { createInput } = require("../controller/inputController");
const router=express.Router();

router.route("/").post(createInput);

module.exports=router