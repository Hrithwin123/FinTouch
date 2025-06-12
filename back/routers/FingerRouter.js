import express from "express"
import { ScanFingerController, FindUserByFinger } from "../controllers/FingerController.js"
const FingerRouter = express.Router()


FingerRouter.get("/scanFinger", ScanFingerController)
FingerRouter.post("/match", FindUserByFinger)



export default FingerRouter