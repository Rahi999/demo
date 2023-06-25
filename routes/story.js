const express = require("express");
const {authMiddleware} = require("../middlewares/userAuth")
const {createStory, getAllStories, deleteStory} = require("../controllers/Story")
const storyRouter = express.Router()

storyRouter.get("/getAll", authMiddleware, getAllStories)
storyRouter.post("/create", authMiddleware, createStory)
storyRouter.delete("/delete/:ID", deleteStory)
module.exports = {storyRouter}