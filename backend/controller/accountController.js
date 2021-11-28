const asyncHandler = require("express-async-handler");
const Account = require("../models/AccountModel");
const Transfer = require("../models/TransferModel");

//AsyncHandler ce hvatati sve greske


const transferAmount = asyncHandler(async (req, res) => {
    const { senderId, receiverId } = req.params;
    const { amount, user } = req.body;

    const transfer = await Transfer.create({
        sender: senderId,
        receiver: receiverId,
        amount,
        user
    });

    try{
    //Skini s sendera
    const accountSender = (await Account.findOneAndUpdate({ _id: senderId }, { $inc: { amount: -amount } }));
    if (accountSender) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("UPDATE SENDER AMOUNT ERROR");
    }

    //Dodaj receiveru
    const accountReceiver = (await Account.findOneAndUpdate({ _id: receiverId }, { $inc: { amount: amount } }));
    if (accountReceiver) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("UPDATE SENDER AMOUNT ERROR");
    }
    }catch (err) {
        // error handling
        console.error("TRANSACTION ERROR");      
      }
    if (transfer) {
        res.status(201).json({
            _id: transfer._id,
            amount: transfer.amount,
            user: transfer.user
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE TRANSFER ERROR");
    }
});

const createAccount = asyncHandler(async (req, res) => {
    const { name, amount, user } = req.body;
    const accountExists = await Account.findOne({ name, user });

    if (accountExists) {
        res.status(400);
        throw new Error("ACCOUNT ALREADY EXISTS");
    }

    const account = await Account.create({
        name,
        amount,
        user
    });

    if (account) {
        res.status(201).json({
            _id: account._id,
            name: account.name,
            amount: account.amount,
            user: category.user
        });
    }
    else {
        res.status(400);
        throw new Error("CREATE ACCOUNT ERROR");
    }
});

const getAccounts = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const accountsList = (await Account.find({ user: userId }));

    if (accountsList) {
        res.status(201).json({
            "accountsList": accountsList.map((e) => {
                const temp = {}
                temp.name = e.name
                temp.id = e._id
                temp.amount = e.amount
                temp.user = e.user
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET ALL ACCOUNTS ERROR");
    }
});

const deleteAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const account = (await Account.findOneAndDelete({ _id: accountId }));
    if (account) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("DELETE ACCOUNT ERROR");
    }
})

const updateAccount = asyncHandler(async (req, res) => {
    const { accountId } = req.params;
    const { name } = req.body;
    const account = (await Account.findOneAndUpdate({ _id: accountId }, { name: name }));
    if (account) {
        res.status(201);
    }
    else {
        res.status(400);
        throw new Error("UPDATE ACCOUNT ERROR");
    }
})

const getTransfers = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const transfersList = (await Transfer.find({ user: userId }));

    if (transfersList) {
        res.status(201).json({
            "transfersList": transfersList.map((e) => {
                const temp = {}
                temp.sender = e.sender
                temp.id = e._id
                temp.receiver = e.receiver
                temp.amount = e.amount
                return temp;
            })
        });
    }
    else {
        res.status(400);
        throw new Error("GET ALL TRANSFERS ERROR");
    }
});

module.exports = { createAccount, getAccounts, deleteAccount, updateAccount, transferAmount,getTransfers }