const express = require("express")
const {SignUp, Login} = require("../controllers/userAuth")
const {getData, postDemoData} = require("../controllers/AuthDemo")
const userRouter = express.Router()

userRouter.post("/signup", SignUp)
userRouter.post("/signin", Login)
userRouter.get("/secure/getDemoDatas", getData);
userRouter.post("/secure/postDemoDatas", postDemoData);
module.exports = {userRouter}