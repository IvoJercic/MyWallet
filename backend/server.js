require("dotenv").config();
const express= require("express");
const connectDB=require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const productRoutes=require("./routes/productRoutes");
const userRoutes=require("./routes/userRoutes");
connectDB();

const app=express();
app.use(express.json());

app.use("/api/products",productRoutes);

app.use("/api/users",userRoutes);
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> console.log("Server is running on port "+PORT));