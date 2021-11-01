const mongoose=require("mongoose");
const Category = require("../models/CategoryModel");
const Subcategory=require("../models/SubcategoryModel");

const rootSchema=mongoose.Schema(
    {
        category:{
            type:Category,
            required:true
        }       
    },
    {
        timestamps:true
    }
);


const Root=mongoose.model("Root",rootSchema);

module.exports=Root;