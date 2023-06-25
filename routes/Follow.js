const express = require("express")
const {authMiddleware} = require("../middlewares/userAuth")
const {Follow, UnFollow} = require("../controllers/Follow")
const followRouter = express.Router()

followRouter.put("/follow/:userId", Follow)
followRouter.put("/unfollow/:userId", UnFollow)

module.exports = {followRouter}