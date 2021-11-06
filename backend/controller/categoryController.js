const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const Subcategory=require("../models/SubcategoryModel");
const Root=require("../models/SubcategoryModel");

//AsyncHandler ce hvatati sve greske

const createCategory = asyncHandler(async (req, res) => {
    const { name, color, icon, user } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error("CATEGORY ALREADY EXISTS");
    }

    const category = await Category.create({
        name,
        color,
        icon,
        user
    });

    if (category) {
        res.status(201).json({
            _id: category._id,
            name: category.name,
            color: category.color,
            icon: category.icon,
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE CATEGORY ERROR");
    }
});

const getCategories = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const categoriesList = (await Category.find({user:userId}));

    if (categoriesList) {
        res.status(201).json({
            "categoriesList": categoriesList.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.color = e.color
                temp.icon=e.icon
                temp.id=e._id
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET ALL CATEGORIES ERROR");
    }
});

const deleteCategory = asyncHandler(async (req,res)=>{
    const { categoryId } = req.params;
    const category = (await Category.findOneAndDelete({_id:categoryId}));

    if (category) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("DELETE CATEGORY ERROR");
    }    
})

module.exports = { createCategory, getCategories ,deleteCategory}