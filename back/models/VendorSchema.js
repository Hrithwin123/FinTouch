import mongoose from "mongoose"

const vendorSchema = mongoose.Schema({

    name : {required : true, type : String},
    password : {required : true, type : String},
    balance : {default : 0, type : Number}


})

const Vendor = mongoose.model("Vendor", vendorSchema)

export default Vendor