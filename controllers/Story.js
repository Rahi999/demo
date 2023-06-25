const {storyModel} = require("../models/Story")

const createStory = async (req, res) => {
    try{
        const story = await new storyModel(req.body).save();
        // await story.populate("user", "firstname surename profile_pic");
        return res.status(200).json({message: "OK", story: story})
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

const getAllStories = async (req, res) => {
    try{
        const getStories = await storyModel.find({})
        .sort({'_id':'descending'});
        // .populate('user', "firstname surename profile_pic")
        // .populate({populate: {path: 'user', model: 'user', select: "firstname surename profile_pic"}})
        return res.status(200).json(getStories)
    }
    catch(err) {
        return res.status(500).json({message: err.message})
    }
}

const deleteStory = async (req, res) => {
    const ID = req.params.id;
    const story = await storyModel.find({"_id":ID});
    try{
        if(!story){
            res.send("Story not found!")
        } else{
            await storyModel.findOneAndDelete({"_id":ID});
            res.send("Story deleted!")
        }

    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports = {createStory, getAllStories, deleteStory}