const {userModel, UserSchema} = require("../models/userAuth");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({message: "You must be logged in!!"});
    }

    const token = authorization.replace('Bearer', "");
    jwt.verify(token, process.env.SECRET_KEY, async(err, payload) => {
        if(err){
            return res.status(401).json({message: "You must be login!!"});
        }
        const {userId} = payload;
        req.userModel = await userModel.findById(userId);
        next();
    })
}

module.exports = {authMiddleware}