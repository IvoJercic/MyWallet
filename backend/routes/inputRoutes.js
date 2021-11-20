const express=require("express");
const { createInput ,getInputs,updateInput} = require("../controller/inputController");
const router=express.Router();

router.route("/").post(createInput);
router.route("/:userId").get(getInputs);
router.route("/:inputId").put(updateInput);

module.exports=router