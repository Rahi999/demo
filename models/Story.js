const mongoose = require('mongoose')
const StorySchema = mongoose.Schema({
    // user: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    url : {type: String, required: true},
    avatar: {type: String, required: true},
    name: {type: String, required: true},
})
const storyModel = mongoose.model("userstory", StorySchema)
module.exports = {StorySchema, storyModel}