const mongoose=require("mongoose");

const categorySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        color:{
            type:String,
            required:true
        },
        icon:{
            type:String,
            required:true
        },
        user:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        }   
    },
    {
        timestamps:true
    }
);


const Category=mongoose.model("Category",categorySchema);

module.exports=Category;