import User from "../models/UserSchema.js"
import bcrypt from "bcryptjs"

export const getUsers =  async(req, res) => {

    const users = await User.find();

    if(users){
        
        return res.json({success : true, message : "All Users Found", users})

    }
    else{
        return res.json({success : false, message : "No users found"})
    }


}

export const addMoney = async(req, res) => {

    const {money, user} = req.body;

    const addMoneyUser = await User.findOne(user);

    if(!addMoneyUser){
        return res.json({success : false, message : `Unable to find user`})

    }

    addMoneyUser.balance += Number(money)

    await addMoneyUser.save()
    return res.json({success : true, message : `Successfully added Rs. ${money} to ${addMoneyUser.name}`})
    
}

export const removeMoney = async(req, res) => {
    
    const {money, user} = req.body;
    
    const debitUser = await User.findOne(user);
    
    if(!debitUser){
        return res.json({success : false, message : "User not found"})
    }
    
    
    if((debitUser.balance - Number(money)) < 0){

        return res.json({success : true, message : "Not enough money in you account", id : null, noBalance : true})
        
    }
    
    debitUser.balance -= Number(money)
    
    await debitUser.save()

    
    
    return res.json({success : true, noBalance : false, message : `Successfully removed Rs. ${money} from ${debitUser.name}`, id : debitUser._id})


}