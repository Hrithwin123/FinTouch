import express from "express"
import { Signup, Login, VendorSignUp, VendorLogin, updatePassword } from "../controllers/AuthContoller.js"

const AuthRouter = express.Router()


AuthRouter.post("/signup", Signup)
AuthRouter.post("/login", Login)
AuthRouter.post("/vendorLogin", VendorLogin)
AuthRouter.post("/vendorSignup", VendorSignUp)
AuthRouter.post("/updatePassword", updatePassword)


export default AuthRouter