const mongoose=require("mongoose");

const transferSchema=mongoose.Schema(
    {
        sender:{
            type:String,
            required:true
        },
        receiver:{
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
        }

    },
    {
        timestamps:true
    }
);


const Transfer=mongoose.model("Transfer",transferSchema);

module.exports=Transfer;