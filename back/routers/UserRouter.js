import express from "express"
import { getUsers, addMoney, removeMoney } from "../controllers/UserController.js"

const UserRouter = express.Router()


UserRouter.get("/getUsers", getUsers)

UserRouter.patch("/addMoney", addMoney)

UserRouter.patch("/removeMoney", removeMoney)

export default UserRouter