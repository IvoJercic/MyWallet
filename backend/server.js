// require("dotenv").config();
const dotenv=require("dotenv");
const express= require("express");
const connectDB=require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const userRoutes=require("./routes/userRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const subcategoryRoutes=require("./routes/subCategoryRoutes")
const inputRoutes=require("./routes/inputRoutes");
const accountRoutes=require("./routes/accountRoutes");
const path=require("path");

const app=express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/subcategory",subcategoryRoutes);
app.use("/api/input",inputRoutes);
app.use("/api/account",accountRoutes);

// DEPLOYMENT
__dirname=path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    });
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log("Server is running on port "+PORT));