const express=require("express");
const { createInput ,getInputs} = require("../controller/inputController");
const router=express.Router();

router.route("/").post(createInput);
router.route("/:userId").get(getInputs);

module.exports=router