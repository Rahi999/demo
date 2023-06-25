const {userModel} = require("../models/userAuth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

// get all signed users from admin side
const getUsers = async (req,res) => {
    try{
        const allUsers = await userModel.find({}).select('profile_pic firstname surename followers following')
        if(!allUsers) return res.status(500).json({message:"Error occured!!"})
        res.send(allUsers)
    }
    catch (error){
        res.send("Something went wrong!!")
    }
}

// Get user by Id 
const getSingleUser = async (req, res) => {
    try{
        const getSignleUser = await userModel.findById(req.params.userId).select('-password');
        if(!getSignleUser) {
            return res.status(404).json({message: "user not found!!"})
        }
        return res.status(200).json(getSignleUser)
    }
    catch(err){
        return res.status(500).json(err.message)
    }
}

// Edit user's personal profile (only if user is editing his own profile)
const editUser = async (req, res) => {
    // taking credentials from user
    const payload = req.body;
    const ID = req.params.id;
    // finding the user with same id and credentials
    const user = await userModel.find({"_id":ID});
    const userId_in_DB = user.userId;
    const userId_making_request = req.body.userId
    try{
        // checking if user is trying to edit his own profile
        if(userId_in_DB != userId_making_request){
            res.send({message: "You're not authorized"})
        }else {
            await userModel.findByIdAndUpdate({"_id":ID}, payload);
            res.send({message: "User's details updated successfully!!!"})
        } 
    }
    catch(err){
        console.log(err)
    }
}



//  Delete user from admin side
const deleteUser = async (req, res) => {
    const ID = req.params.id;
    const user = await userModel.find({"_id":ID});
    try{
        if(!user){
            res.send("User not found with this id")
        } else{
            await userModel.findOneAndDelete({"_id":ID});
            res.send("User deleted")
        }

    }
    catch(error){
        console.log(error)
    }
}

const search = async (req, res) => {
    try {
      const query = req.params.query;
      const results = await userModel.find({ $text: { $search: query } }).select(
        "firstname surename profile_pic"
      );
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {search, getUsers, getSingleUser, editUser, deleteUser}