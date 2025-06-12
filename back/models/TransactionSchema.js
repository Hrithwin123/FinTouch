import mongoose from "mongoose"

const TransactionSchema = mongoose.Schema({

    from : {required : true, type : String},
    to : {required : true, type : String},
    amount : {required : true, type : Number}


})

const Transaction = mongoose.model("Transaction", TransactionSchema)

export default Transaction