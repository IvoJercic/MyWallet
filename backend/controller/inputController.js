const asyncHandler = require("express-async-handler");
const Input = require("../models/InputModel");

//AsyncHandler ce hvatati sve greske

const createInput = asyncHandler(async (req, res) => {
    const { datetime, category, subcategory, description,amount } = req.body;
    const input = await Input.create({
        datetime,
        category,
        subcategory,
        description,
        amount
    });
    if (input) {
        res.status(201).json({
            _id: input._id,
            datetime:input.category,
            description: input.description,
            category: input.category,
            subcategory: input.subcategory,
            amount:input.amount
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE INPUT ERROR");
    }
});


module.exports = { createInput }