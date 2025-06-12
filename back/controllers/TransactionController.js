import Transaction from "../models/TransactionSchema.js"

export const getTransactions = async(req, res) => {

    const transactions = await Transaction.find()

    if(transactions){

        return res.json({success : true, message : "All transactions", transactions})
    }
    
    return res.json({success : false, message : "Transactions not found"})

}