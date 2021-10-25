const express=require("express");
const router=express.Router();

const {getAllProducts,getProductById} = require("../controller/productController")

//Get all products from DB
// /api/products
router.get("/",getAllProducts);

//Get a product from DB
// /api/products/:id
router.get("/:id",getProductById);


module.exports=router;