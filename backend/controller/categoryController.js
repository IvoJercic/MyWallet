const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const Subcategory = require("../models/SubcategoryModel");
const Input =require("../models/InputModel")

//AsyncHandler ce hvatati sve greske

const createCategory = asyncHandler(async (req, res) => {
    const { name, color, icon, user,type } = req.body;
    const categoryExists = await Category.findOne({ name ,user});

    if (categoryExists) {
        res.status(400);
        throw new Error("CATEGORY ALREADY EXISTS");
    }

    const category = await Category.create({
        name,
        color,
        icon,
        user,
        type
    });

    if (category) {
        res.status(201).json({
            _id: category._id,
            name: category.name,
            color: category.color,
            icon: category.icon,
            type:category.type
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE CATEGORY ERROR");
    }
});

const getCategories = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const categoriesList = (await Category.find({ user: userId }));

    if (categoriesList) {
        res.status(201).json({
            "categoriesList": categoriesList.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.color = e.color
                temp.icon = e.icon
                temp.id = e._id
                temp.type=e.type
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET ALL CATEGORIES ERROR");
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const category = (await Category.findOneAndDelete({ _id: categoryId }));
    const subcategories=(await Subcategory.find({category:categoryId}));    
    subcategories.forEach(element => {
        Subcategory.findOneAndDelete({_id:element._id}).then(()=>{
            console.log("Subcategory deleted");
        }) 
    });
    
    const inputs=(await Input.find({category:categoryId}))    

    inputs.forEach(element => {
        Input.findOneAndDelete({_id:element._id}).then(()=>{
            console.log("Input deleted");
        }) 
    });
    
    if (category) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("DELETE CATEGORY ERROR");
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, color, icon } = req.body;
    const category = (await Category.findOneAndUpdate({_id:categoryId},{ name: name,color:color,icon:icon }));
    if (category) {        
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("UPDATE CATEGORY ERROR");
    }
})

module.exports = { createCategory, getCategories, deleteCategory,updateCategory }