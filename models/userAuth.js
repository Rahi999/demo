const mongoose = require("mongoose")
const UserSchema = mongoose.Schema({
    firstname: {type:String, required:true, text: true},
    surename: {type:String, required:true, text: true},
    profile_pic: {type:String, required:true, text: true, default:"https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"},
    cover_pic: {type:String, default:"https://alejandrorioja.com/wp-content/uploads/2019/03/800px-Facebook_New_Logo_2015.svg_.png"},
    mobile: {type:Number},
    email: {type:String, required:true, trim: true},
    password: {type:String, required:true},
    day: {type:Number, required:true},
    month: {type:Number, requiredL:true},
    year: {type:Number, required:true},
    gender: {type:String, default:"male", text: true},
    following: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    followers: [{type:mongoose.Schema.Types.ObjectId, ref: 'user'}],
    createdAt: {type: Date, default:Date.now}
})

const userModel = mongoose.model('user', UserSchema)
module.exports = {userModel, UserSchema}