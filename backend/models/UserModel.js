const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        // picture:{
        //     type:String,
        //     required:true,
        //     default:
        //         "https://media-exp1.licdn.com/dms/image/C4D03AQFlgeKhqY5ktQ/profile-displayphoto-shrink_100_100/0/1634932650392?e=1640217600&v=beta&t=MkCC-Yyxxwl51qpB7hEdGwUXN2l5YGrA-HcyL8gOHkQ"
        // }
    },
    {
        timestamps:true
    }
);

//Pre tj prije nego što se pozove save funkcije pozvat cemo middlewar
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);///što veći broj to je sigurnija sifra
    this.password=await bcrypt.hash(this.password,salt)
});

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User=mongoose.model("User",userSchema);

module.exports=User;