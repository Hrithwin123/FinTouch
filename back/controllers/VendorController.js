import Vendor from "../models/VendorSchema.js"
import User from "../models/UserSchema.js";
import Transaction from "../models/TransactionSchema.js";


export const getVendors = async(req, res) => {

const vendors = await Vendor.find();

if(!vendors){
    return res.json({success : false, message : "no vendors found"})
}

return res.json({success : true, message : "All Vendors", vendors})

}

export const sendMoneyToVendor = async(req, res) => {

    const {id, money, sender} = req.body;

    const creditVendor = await Vendor.findById(id)

    if(!creditVendor){
        return res.json({success : false, message : "vendor not found"})
    }

    creditVendor.balance += Number(money)

    await creditVendor.save()

    const foundSender = await User.findById(sender)

    const transaction = new Transaction({
        from : foundSender.name,
        to : creditVendor.name,
        amount : money
    })

    await transaction.save()

    return res.json({success : true, message : `Successfully recieved Rs. ${money} to ${creditVendor.name}`, id})
    
}