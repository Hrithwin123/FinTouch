import express from "express"
import { Signup, Login, VendorSignUp, VendorLogin } from "../controllers/AuthContoller.js"

const AuthRouter = express.Router()


AuthRouter.post("/signup", Signup)
AuthRouter.post("/login", Login)
AuthRouter.post("/vendorLogin", VendorLogin)
AuthRouter.post("/vendorSignup", VendorSignUp)


export default AuthRouter