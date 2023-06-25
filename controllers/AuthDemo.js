const {AuthdemoSchema, authdemoModel} = require("../models/AuthDemo")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const postDemoData = async (req, res) => {
    const {firstname, email, password} = req.body; 
    try{
        if(!firstname || !email || !password) {
            return res.status(403).json({message: "All fields are required!!"})
        }else {
            const demoData = new authdemoModel({...req.body})
            demoData.save();
            return res.status(200).json({message: "Added Successfully!!!"})
        }
    }
    catch(err){
        console.log(err)
    }
}

const getData = async (req, res) => {
    try{
        const data = await authdemoModel.find({});
        res.send(data)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {getData, postDemoData}