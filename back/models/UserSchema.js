import mongoose from "mongoose"

const userSchema = mongoose.Schema({

    name : {required : true, type : String},
    password : {required : true, type : String},
    template : {required : true, type : String},
    balance : {default : 0, type : Number}


})

const User = mongoose.model("User", userSchema)

export default User