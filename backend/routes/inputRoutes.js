const express=require("express");
const { createInput ,getInputs,deleteInput,updateInput} = require("../controller/inputController");
const router=express.Router();

router.route("/").post(createInput);
router.route("/:userId").get(getInputs);
router.route("/:inputId").delete(deleteInput);
router.route("/:inputId").put(updateInput);

module.exports=router