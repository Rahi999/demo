const express = require("express");
const {authMiddleware} = require("../middlewares/userAuth")
const {createPost, getAllPosts, addComment, likePost, dislikePost, getSinglePost} = require("../controllers/Post")
const uploadOptions = require("../middlewares/upload")
const postRouter = express.Router()

postRouter.get("/get", authMiddleware, getAllPosts)
postRouter.get("/get/:postId", authMiddleware, getSinglePost)
postRouter.post('/create' , createPost);
postRouter.put("/comment", authMiddleware, addComment)
postRouter.put("/like/:postId", authMiddleware, likePost)
postRouter.put("/dislike/:postId", authMiddleware, dislikePost)

module.exports = {postRouter}