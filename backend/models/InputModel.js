const mongoose=require("mongoose");

const inputSchema=mongoose.Schema(
    {
        datetime:{
            type:Date,
            required:false
        },
        category:{
            type:String,
            required:true
        },
        subcategory:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        user:{
            type:String,
            required:true
        },
        account:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);


const Input=mongoose.model("Input",inputSchema);

module.exports=Input;