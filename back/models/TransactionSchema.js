import mongoose from "mongoose"

const TransactionSchema = mongoose.Schema({

    from : {required : true, type : String},
    to : {required : true, type : String},
    amount : {required : true, type : Number},
    date : {type : Date, default : Date.now}

})

const Transaction = mongoose.model("Transaction", TransactionSchema)

export default Transaction