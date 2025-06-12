import express from "express"
import { getTransactions } from "../controllers/TransactionController.js"
const TransactionRouter = express.Router()

TransactionRouter.get("/getTransactions", getTransactions)

export default TransactionRouter