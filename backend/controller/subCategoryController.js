const asyncHandler = require("express-async-handler");
const Subcategory = require("../models/SubcategoryModel");
const Category=require("../models/CategoryModel");

//AsyncHandler ce hvatati sve greske
const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category, icon,user } = req.body;
    // const categoryy=await Category.findOne({name:category});
    // const categoryyId=categoryy["id"].toString();
    const subCategoryExists = await Subcategory.findOne({ name: name, category: category });

    if (subCategoryExists) {
        res.status(400);
        throw new Error("Subcategory Already Exists");
    }
    const subcategory = await Subcategory.create({
        name: name,
        category: category,
        icon: icon,
        user:user
    });

    if (subcategory) {
        res.status(201).json({
            _id: subcategory._id,
            name: subcategory.name,
            category: subcategory.category,
            icon: subcategory.icon,
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE SUBCATEGORY ERROR");
    }
});

const getSubcategories = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const subCategories = (await Subcategory.find({ category: categoryId }));

    if (subCategories) {
        res.status(201).json({
            "subcategoriesList": subCategories.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.category = e.category
                temp.icon = e.icon
                temp.id = e._id
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET SUBCATEGORIES FOR CATEGORY ERROR");
    }
});

const deleteSubCategory = asyncHandler(async (req, res) => {
    const { subcategoryId } = req.params;
    const subcategory = (await Subcategory.findOneAndDelete({ _id: subcategoryId }));

    if (subcategory) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("DELETE SUBCATEGORY ERROR");
    }
})

const updateSubCategory = asyncHandler(async (req, res) => {
    const { subcategoryId } = req.params;
    const { name, icon } = req.body;
    const subcategory = (await Subcategory.findOneAndUpdate({_id:subcategoryId},{ name: name,icon:icon }));
    if (subcategory) {        
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("UPDATE SUBCATEGORY ERROR");
    }
})

const getSubcategoriesForUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const subCategories = (await Subcategory.find({ user:userId }));

    if (subCategories) {
        res.status(201).json({
            "subcategoriesList": subCategories.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.category = e.category
                temp.icon = e.icon
                temp.id = e._id
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET SUBCATEGORIES FOR USER ERROR");
    }
});


module.exports = { createSubCategory, getSubcategories, deleteSubCategory ,updateSubCategory,getSubcategoriesForUser}