const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const Subcategory=require("../models/SubcategoryModel");
const Root=require("../models/SubcategoryModel");

//AsyncHandler ce hvatati sve greske


const createSubCategory = asyncHandler(async (req, res) => {
    const { name, category, icon } = req.body;
    const categoryy=await Category.findOne({name:category});
    const categoryyId=categoryy["id"].toString();
    const subCategoryExists = await Subcategory.findOne({ name,categoryyId });

    if (subCategoryExists) {
        res.status(400);
        throw new Error("Subcategory Already Exists");        
    }    
    const subcategory = await Subcategory.create({
        name:name,
        category:categoryyId,
        icon:icon,
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
        throw new Error("Error Occured");
    }
});


const getSubcategories = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const subCategories=(await Subcategory.find({category:categoryId}));

    if (subCategories) {
        res.status(201).json({
            "subcategoriesList": subCategories.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.category = e.category
                temp.icon=e.icon
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("Error Occured");
    }
});

module.exports = {  createSubCategory,getSubcategories }