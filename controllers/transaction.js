const Transaction = require("../models/transaction");

const createTransaction = async (req, res) => {
    const transaction = new Transaction(req.body);

    try{
        await transaction.save();
        res.status(201).json(transaction);
    }catch(err){
        res.status(400).send({ status: 400, message: err.message});
    }
};

module.exports = {
    createTransaction
};