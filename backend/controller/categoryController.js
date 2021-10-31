const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
//AsyncHandler ce hvatati sve greske

const createCategory = asyncHandler(async (req, res) => {
    const { name, color, icon } = req.body;
    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error("Category Already Exists");
    }

    const category = await Category.create({
        name,
        color,
        icon,
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
        throw new Error("Error Occured");
    }
});

const getCategories = asyncHandler(async (req, res) => {
    const categoriesList = (await Category.find({}));

    if (categoriesList) {
        res.status(201).json({
            "categoriesList": categoriesList.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.color = e.color
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

module.exports = { createCategory, getCategories }