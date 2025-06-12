import express from "express"
import { getVendors, sendMoneyToVendor } from "../controllers/VendorController.js"
const VendorRouter = express.Router()


VendorRouter.get("/getVendors", getVendors)

VendorRouter.patch("/sendMoney", sendMoneyToVendor)


export default VendorRouter