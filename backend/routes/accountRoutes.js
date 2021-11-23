const express=require("express");
const { getAccounts, createAccount,deleteAccount,updateAccount,transferAmount} = require("../controller/accountController");
const router=express.Router();

router.route("/").post(createAccount);
router.route("/:senderId/:receiverId/").post(transferAmount);
router.route("/:userId").get(getAccounts);
router.route("/:accountId").delete(deleteAccount);
router.route("/:accountId").put(updateAccount);


module.exports=router