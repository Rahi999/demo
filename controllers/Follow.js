
const {userModel} = require('../models/userAuth');

// follow and unfollow  users 
const Follow = async (req , res) => {
    try {
        if(req.body.userId !== req.params.userId){
            // Taking sender_userID and reciever_userID from user
            const follow_sender = await userModel.findById(req.body.userId);
            const follow_reciever = await userModel.findById(req.params.userId);
            // Checking if user is already not following this user
            if(!follow_reciever.followers.includes(follow_sender._id) && 
            !follow_sender.following.includes(follow_reciever._id)){
                // updating the followers list of reciever
                await follow_reciever.updateOne({ $push : {followers: follow_sender._id}});
                // updating the following list of sender
                await follow_sender.updateOne({$push : {following: follow_reciever._id}});
                // console.log(follow_sender.following)
                return res.status(200).json({message: "Followed success!!"})
            }
            else{
                return res.status(400).json({message:"You're already following this user!"})
            }
        }
        else{
            res.status(400).json({message: "Can't follow yourself!"})
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const UnFollow = async (req , res) => {
    try {
        if(req.body.userId !== req.params.userId){
            // Taking sender_userID and reciever_userID from user
            const unfollow_sender = await userModel.findById(req.body.userId);
            const unfollow_reciever = await userModel.findById(req.params.userId);
            // Checking if user is following this user
            if(unfollow_reciever.followers.includes(unfollow_sender._id) && 
            unfollow_sender.following.includes(unfollow_reciever._id)){
                // updating the followers list of reciever
                await unfollow_reciever.updateOne({ $pull : {followers: unfollow_sender._id}});
                // updating the following list of sender
                await unfollow_sender.updateOne({$pull : {following: unfollow_reciever._id}});
                return res.status(200).json({message: "Unfollowed succeed!!"})
            }
            else{
                return res.status(400).json({message: "Can unfollow to only followed users!"})
            }
        }
        else{
            return res.status(400).json({message: "Can't unfollow yourself!"})
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    Follow, UnFollow
}