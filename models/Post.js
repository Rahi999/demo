const mongoose = require("mongoose")
const {ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema({
    type: {type: String,  default:null},
    text: {type: String},
    images : {type: String},
    date : {type : String, required: true},
    user: {type: ObjectId, ref: "user", required: true},
    background: {type: String},
    likes: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    dislikes: [{type:mongoose.Schema.Types.ObjectId, ref: 'user'}],
    comments: [
        {comment: {type: String},
         images: {type: String},
         user: {type: ObjectId, ref: "user", required: true},
         commentAt: {type: String, requried: true}
    }]
}, {timeStamp: true})

const PostModel = mongoose.model("Post", postSchema);
module.exports = {PostModel}