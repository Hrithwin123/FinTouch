import express from "express"
import { ScanFingerController, FindUserByFinger, updateFingerprint } from "../controllers/FingerController.js"
const FingerRouter = express.Router()


FingerRouter.get("/scanFinger", ScanFingerController)
FingerRouter.post("/match", FindUserByFinger)
FingerRouter.patch("/updateFingerprint", updateFingerprint)



export default FingerRouter