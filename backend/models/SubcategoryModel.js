const mongoose=require("mongoose");

const subcategorySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        }        
    },
    {
        timestamps:true
    }
);


const Subcategory=mongoose.model("Subcategory",subcategorySchema);

module.exports=Subcategory;