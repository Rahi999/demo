const {PostModel} = require("../models/Post");
const {userModel} = require("../models/userAuth");

const createPost = async (req, res) => {
    try{
        const post = await new PostModel(req.body).save();
        await post.populate("user", "firstname surename profile_pic cover_pic");
        return res.status(200).json({message: "OK", post: post})
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getAllPosts = async (req, res) => {
    try{
        const getPosts = await PostModel.find({})
        .populate('user', "firstname surename profile_pic")
        .populate({path: "comments", populate: {path: 'user', model: 'user', select: "firstname surename profile_pic"}})
        .sort({'_id':'descending'});
        return res.status(200).json(getPosts)
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
}

const getSinglePost = async (req, res) => {
  try{
      const getSignlePost = await PostModel.findById(req.params.postId)
      .populate('user', "firstname surename profile_pic")
        .populate({path: "comments", populate: {path: 'user', model: 'user', select: "firstname surename profile_pic"}})
        .sort({'_id':'descending'});
      if(!getSignlePost) {
          return res.status(404).json({message: "Post not found!!"})
      }
      return res.status(200).json(getSignlePost)
  }
  catch(err){
      return res.status(500).json(err.message)
  }
}

const addComment = async (req, res) => {
    try {
      const { comment, image, postId, user, commentAt} = req.body;
      let newComments = await PostModel.findByIdAndUpdate(
        postId,
        {
          $push: {
            comments: {
              comment: comment,
              images: image,
              user: req.body.user,
              commentAt: req.body.commentAt,
            },
          },
        },
        {
          new: true,
        }
      ).populate("comments.user", "profile_pic firstname surename");
      res.json(newComments.comments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const likePost = async (req, res) => {
    const {likerId} = req.body
    const {postId} = req.params
    try {
          const post_liker = await userModel.findById(likerId);
          const post = await PostModel.findById(postId);
          if(!post.likes.includes(post_liker._id)){
              await post.updateOne({ $push : {likes: post_liker._id}})
              return res.status(200).json({message: "Liked success!!"})
          }
          else{
              return res.status(400).json({message:"You've already liked this post!"})
          }
  } catch (error) {
      return res.status(500).json(error.message);
  }
  }

  const dislikePost = async (req, res) => {
    const {dislikerId} = req.body
    const {postId} = req.params
    try {
          const post_disliker = await userModel.findById(dislikerId);
          const post = await PostModel.findById(postId);
          if(!post.dislikes.includes(post_disliker._id)){
              await post.updateOne({ $push : {dislikes: post_disliker._id}})
              return res.status(200).json({message: "DisLiked success!!"})
          }
          else{
              return res.status(400).json({message:"You've already disliked this post!"})
          }
  } catch (error) {
      return res.status(500).json(error.message);
  }
  }
  
module.exports = {createPost, getAllPosts, getSinglePost, addComment, likePost, dislikePost}