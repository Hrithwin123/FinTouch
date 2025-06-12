import mongoose from "mongoose";

export default function connectDb(){

mongoose.connect("mongodb://localhost:27017/finger")
.then(() => console.log("connected to db"))
    
}