const asyncHandler = require("express-async-handler");
const Input = require("../models/InputModel");

//AsyncHandler ce hvatati sve greske

const createInput = asyncHandler(async (req, res) => {
    const { datetime, category, subcategory, description,amount,user } = req.body;
    const input = await Input.create({
        datetime,
        category,
        subcategory,
        description,
        amount,
        user
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


const getInputs = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const inputsList = (await Input.find({ user: userId }));
    if (inputsList) {
        res.status(201).json({
            "inputsList": inputsList.map((e) => {
                const temp = {}
                temp.datetime = e.datetime
                temp.category = e.category
                temp.subcategory = e.subcategory
                temp.id = e._id
                temp.description=e.description
                temp.amount=e.amount
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET ALL INPUTS ERROR");
    }
});


module.exports = { createInput,getInputs }