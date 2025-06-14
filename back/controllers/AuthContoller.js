import bcrypt from "bcryptjs";

import User from "../models/UserSchema.js";
import Vendor from "../models/VendorSchema.js";

export const Signup = async(req, res) => {

    const {name, password, template} = req.body;

    const existsUser = await User.findOne({name});

    if(existsUser){
        return res.json({success : false, message : "This username is already taken"})
    }


    if(!name || !password){
        return res.json({success : false, message : "Signup failed"})

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name, password : hashedPassword, template
    })

    await user.save()

    res.json({success : true, message : "Signup successfull", url : `/payments`})

}

export const Login = async (req, res) => {

    const {name, password} = req.body;

    const user = await User.findOne({name})

    if(!user){
        return res.json({success : true, message : "User not found, would you like to Signup ?"})
    }


    const correctPassword = await bcrypt.compare(password, user.password)

    if(!correctPassword){
        return res.json({success : false, message : "Incorrect Password"})

    }

    if(user){
        return res.json({success : true, message : "Login successfull", url : `/doneLogin/${user._id}`})
    }

    return res.json({success : false, message : "Login Failed"})

}

export const VendorSignUp = async(req, res) => {

    const {name, password, template} = req.body;

    if(!name || !password){
        return res.json({success : false, message : "Signup failed"})

    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new Vendor({
        name, password : hashedPassword, template
    })

    await user.save()

    res.json({success : true, message : "Signup successfull", url : `/payments`})


}

export const VendorLogin = async (req, res) => {

    const {name, password} = req.body;

    const user = await Vendor.findOne({name})

    const correctPassword = await bcrypt.compare(password, user.password)

    if(!correctPassword){

        return res.json({success : false, message : "Wrong Password", url : `/payments`})
    }

    if(user){
        return res.json({success : true, message : "Login successfull", url : `/payments`})
    }

    return res.json({success : false, message : "Login Failed"})



}


export const updatePassword = async(req, res) => {

    const {id, newPassword, currentPassword} = req.body;

    const user = await User.findById(id)

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if(!passwordMatch){

        return res.json({success : false, message : "Incorrect Password"})

    }

    if(!user){
        return res.json({success : false, message : "It seems you arent authenticated, you should probably login"})
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    
    await user.save()
    
    return res.json({success : true, message : "Password changed successfully"})


}