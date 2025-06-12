import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import connectDb from "./utils/connectDb.js"

import FingerRouter from "./routers/FingerRouter.js"
import AuthRouter from "./routers/AuthRouter.js"
import UserRouter from "./routers/UserRouter.js"
import VendorRouter from "./routers/VendorRouter.js"
import TransactionRouter from "./routers/TransactionRouter.js"

import User from "./models/UserSchema.js"
import Vendor from "./models/VendorSchema.js"

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors : {
        origin : "*"
    }
})

io.on("connection", (socket) => {

    socket.on("userMoneyChange", async({id}) => {

        const foundUser = await User.findById(id);
        io.emit("userMoneyChange", {balance : foundUser.balance, id})

    })

    socket.on("vendorMoneyChange", async({id}) => {
        const foundVendor = await Vendor.findById(id);
        io.emit("vendorMoneyChange", {balance : foundVendor.balance, id})
    })


})




app.use(cors())
app.use(express.json())

connectDb()

app.use("/", FingerRouter)
app.use("/", AuthRouter)
app.use("/", UserRouter)
app.use("/", VendorRouter)
app.use("/", TransactionRouter)


server.listen(3000, () => console.log("app is listening on port 3000"))