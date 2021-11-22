const mongoose=require("mongoose");

const accountSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        user:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }   
    },
    {
        timestamps:true
    }
);


const Account=mongoose.model("Account",accountSchema);

module.exports=Account;