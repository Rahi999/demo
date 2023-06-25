const express = require("express")
const {authMiddleware} = require("../middlewares/userAuth")
const {sendMessage, getMessages, deleteMessages} = require("../controllers/Chat")
const chatRouter = express.Router()

chatRouter.post("/send-messages", authMiddleware, sendMessage)
chatRouter.get("/get-messages/:senderId/:receiverId", authMiddleware, getMessages)
chatRouter.delete("/delete-messages/:senderId/:receiverId", authMiddleware, deleteMessages)

module.exports = {chatRouter}